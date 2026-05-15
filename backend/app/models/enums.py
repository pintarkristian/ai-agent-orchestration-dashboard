from enum import Enum


class AgentRole(str, Enum):
    """Supported roles used by the orchestration workflow."""

    PLANNER = "planner"
    RESEARCHER = "researcher"
    TECHNICAL_ARCHITECT = "technical_architect"
    DEVELOPER = "developer"
    REVIEWER = "reviewer"
    FINAL_ANSWER = "final_answer"


class WorkflowStatus(str, Enum):
    """Lifecycle states for workflow runs, steps, and agent executions."""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
