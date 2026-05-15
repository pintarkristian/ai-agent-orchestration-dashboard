from __future__ import annotations

from app.agents.base_agent import BaseAgent, CompletionClient
from app.models.enums import AgentRole

DEVELOPER_SYSTEM_PROMPT = """You are the Developer Agent in an AI agent orchestration system.
Your job is to turn plans and architecture into implementation-focused guidance.
Focus on concrete coding steps, file organization, important functions, interfaces,
testing approach, edge cases, and maintainable implementation details.
Prefer clear step-by-step guidance and concise code-oriented recommendations."""


class DeveloperAgent(BaseAgent):
    """Agent that creates implementation steps or code-focused guidance."""

    def __init__(self, openrouter_client: CompletionClient) -> None:
        super().__init__(
            role=AgentRole.DEVELOPER,
            name="Developer Agent",
            description="Creates implementation steps and code-focused guidance.",
            system_prompt=DEVELOPER_SYSTEM_PROMPT,
            openrouter_client=openrouter_client,
        )
