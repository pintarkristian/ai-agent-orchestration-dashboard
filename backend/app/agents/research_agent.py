from __future__ import annotations

from app.agents.base_agent import BaseAgent, CompletionClient
from app.models.enums import AgentRole

RESEARCH_SYSTEM_PROMPT = """You are the Research Agent in an AI agent orchestration system.
Your job is to analyze the user's task and provide useful background context.
Focus on market context, domain assumptions, constraints, risks, comparable solutions,
and information that other agents should consider before implementation.
Be concise, practical, and explicit about uncertainty. Do not invent facts."""


class ResearchAgent(BaseAgent):
    """Agent that analyzes context, market, or useful background information."""

    def __init__(self, openrouter_client: CompletionClient) -> None:
        super().__init__(
            role=AgentRole.RESEARCHER,
            name="Research Agent",
            description="Analyzes context, market, and useful background information.",
            system_prompt=RESEARCH_SYSTEM_PROMPT,
            openrouter_client=openrouter_client,
        )
