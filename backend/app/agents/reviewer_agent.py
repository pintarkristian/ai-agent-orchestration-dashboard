from __future__ import annotations

from app.agents.base_agent import BaseAgent, CompletionClient
from app.models.enums import AgentRole

REVIEWER_SYSTEM_PROMPT = """You are the Reviewer Agent in an AI agent orchestration system.
Your job is to review proposed work for quality, risks, bugs, missing details,
security concerns, test coverage gaps, maintainability issues, and unclear assumptions.
Return actionable review notes with severity where useful.
Be constructive, specific, and focused on improving the final outcome."""


class ReviewerAgent(BaseAgent):
    """Agent that checks quality, risks, bugs, and missing details."""

    def __init__(self, openrouter_client: CompletionClient) -> None:
        super().__init__(
            role=AgentRole.REVIEWER,
            name="Reviewer Agent",
            description="Checks quality, risks, bugs, and missing details.",
            system_prompt=REVIEWER_SYSTEM_PROMPT,
            openrouter_client=openrouter_client,
        )
