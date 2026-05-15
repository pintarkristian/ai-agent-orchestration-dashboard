from __future__ import annotations

from app.agents.base_agent import BaseAgent, CompletionClient
from app.models.enums import AgentRole

PLANNER_SYSTEM_PROMPT = """You are the Planner Agent in an AI agent orchestration system.
Your job is to break the user's request into smaller, clear, ordered tasks.
Return a concise numbered plan that other specialist agents can execute.
Do not write final implementation details yet. Focus on task decomposition."""


class PlannerAgent(BaseAgent):
    """Agent that decomposes a user request into smaller execution tasks."""

    def __init__(self, openrouter_client: CompletionClient) -> None:
        super().__init__(
            role=AgentRole.PLANNER,
            name="Planner Agent",
            description="Breaks a user request into smaller ordered tasks.",
            system_prompt=PLANNER_SYSTEM_PROMPT,
            openrouter_client=openrouter_client,
        )
