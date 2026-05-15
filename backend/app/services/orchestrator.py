from __future__ import annotations

from datetime import UTC, datetime
from typing import Protocol
from uuid import uuid4

from app.agents import (
    DeveloperAgent,
    FinalAnswerAgent,
    PlannerAgent,
    ResearchAgent,
    ReviewerAgent,
    TechnicalArchitectAgent,
)
from app.agents.base_agent import CompletionClient
from app.models.agent import AgentExecutionResult
from app.models.enums import AgentRole, WorkflowStatus
from app.models.workflow import WorkflowResult, WorkflowStep
from app.repositories.workflow_repository import WorkflowRepository


class WorkflowAgent(Protocol):
    """Protocol implemented by orchestration agents."""

    role: AgentRole
    name: str
    description: str

    async def run(self, input_text: str) -> AgentExecutionResult:
        """Run the agent for the supplied input text."""


class SequentialOrchestrator:
    """Runs all specialized agents in a fixed sequential workflow."""

    def __init__(
        self,
        *,
        openrouter_client: CompletionClient | None = None,
        agents: list[WorkflowAgent] | None = None,
        workflow_repository: WorkflowRepository | None = None,
    ) -> None:
        self.workflow_repository = workflow_repository
        if agents is not None:
            self.agents = agents
        else:
            if openrouter_client is None:
                raise ValueError("openrouter_client is required when agents are not provided")
            self.agents = self._build_default_agents(openrouter_client)

    async def run(self, task: str) -> WorkflowResult:
        """Run the user task through all agents in sequence."""
        workflow_id = str(uuid4())
        workflow_started_at = datetime.now(UTC)
        steps: list[WorkflowStep] = []
        previous_outputs: list[WorkflowStep] = []
        final_answer: str | None = None

        for agent in self.agents:
            agent_input = self._build_agent_input(
                task=task,
                current_role=agent.role,
                previous_steps=previous_outputs,
            )
            result = await agent.run(agent_input)
            step = self._step_from_result(agent=agent, result=result)
            steps.append(step)

            if result.status == WorkflowStatus.FAILED:
                workflow_completed_at = datetime.now(UTC)
                workflow_error = self._workflow_error(agent=agent, result=result)
                duration_ms = self._duration_ms(workflow_started_at, workflow_completed_at)

                failed_result = WorkflowResult(
                    id=workflow_id,
                    input=task,
                    output=None,
                    final_answer=None,
                    status=WorkflowStatus.FAILED,
                    steps=steps,
                    error=workflow_error,
                    created_at=workflow_started_at,
                    started_at=workflow_started_at,
                    completed_at=workflow_completed_at,
                    duration_ms=duration_ms,
                    total_duration_ms=duration_ms,
                )
                return self._persist_result(failed_result)

            previous_outputs.append(step)
            if agent.role == AgentRole.FINAL_ANSWER:
                final_answer = str(result.output) if result.output is not None else None

        workflow_completed_at = datetime.now(UTC)
        total_duration_ms = self._duration_ms(workflow_started_at, workflow_completed_at)

        completed_result = WorkflowResult(
            id=workflow_id,
            input=task,
            output=final_answer,
            final_answer=final_answer,
            status=WorkflowStatus.COMPLETED,
            steps=steps,
            error=None,
            created_at=workflow_started_at,
            started_at=workflow_started_at,
            completed_at=workflow_completed_at,
            duration_ms=total_duration_ms,
            total_duration_ms=total_duration_ms,
        )
        return self._persist_result(completed_result)

    def _persist_result(self, result: WorkflowResult) -> WorkflowResult:
        """Persist a workflow result when a repository was provided."""
        if self.workflow_repository is None:
            return result
        return self.workflow_repository.save_workflow_result(result)

    @staticmethod
    def _build_default_agents(openrouter_client: CompletionClient) -> list[WorkflowAgent]:
        """Create the default agent sequence for a workflow run."""
        return [
            PlannerAgent(openrouter_client=openrouter_client),
            ResearchAgent(openrouter_client=openrouter_client),
            TechnicalArchitectAgent(openrouter_client=openrouter_client),
            DeveloperAgent(openrouter_client=openrouter_client),
            ReviewerAgent(openrouter_client=openrouter_client),
            FinalAnswerAgent(openrouter_client=openrouter_client),
        ]

    @staticmethod
    def _build_agent_input(
        *,
        task: str,
        current_role: AgentRole,
        previous_steps: list[WorkflowStep],
    ) -> str:
        """Build contextual input for the next agent."""
        if not previous_steps:
            return f"Original user task:\n{task}"

        previous_context = "\n\n".join(
            f"{step.role.value} output:\n{step.output}"
            for step in previous_steps
            if step.output is not None
        )

        return (
            f"Original user task:\n{task}\n\n"
            f"Previous agent outputs:\n{previous_context}\n\n"
            f"Now perform the {current_role.value} agent responsibility."
        )

    @staticmethod
    def _step_from_result(
        *,
        agent: WorkflowAgent,
        result: AgentExecutionResult,
    ) -> WorkflowStep:
        """Convert an agent execution result into a workflow step."""
        return WorkflowStep(
            role=agent.role,
            name=agent.name,
            description=agent.description,
            input=result.input,
            output=result.output,
            status=result.status,
            error=result.error,
            started_at=result.started_at,
            completed_at=result.completed_at,
            duration_ms=result.duration_ms,
        )

    @staticmethod
    def _workflow_error(*, agent: WorkflowAgent, result: AgentExecutionResult) -> str:
        """Build a useful workflow-level error message."""
        detail = result.error or "Unknown agent error"
        return f"Workflow stopped because {agent.name} failed: {detail}"

    @staticmethod
    def _duration_ms(started_at: datetime, completed_at: datetime) -> int:
        """Return elapsed time in milliseconds."""
        return max(0, int((completed_at - started_at).total_seconds() * 1000))


__all__ = ["SequentialOrchestrator", "WorkflowAgent"]
