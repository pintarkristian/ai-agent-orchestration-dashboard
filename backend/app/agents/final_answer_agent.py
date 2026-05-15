from __future__ import annotations

from app.agents.base_agent import BaseAgent, CompletionClient
from app.models.enums import AgentRole

FINAL_ANSWER_SYSTEM_PROMPT = """You are the Final Answer Agent in an AI agent orchestration system.
Your job is to combine outputs from previous agents into one clean final response.
Synthesize the plan, research, architecture, implementation guidance, and review notes.
Remove duplication, resolve conflicts, and present the result in a clear user-ready format.
Be concise, complete, and practical."""


class FinalAnswerAgent(BaseAgent):
    """Agent that combines previous outputs into one clean final response."""

    def __init__(self, openrouter_client: CompletionClient) -> None:
        super().__init__(
            role=AgentRole.FINAL_ANSWER,
            name="Final Answer Agent",
            description="Combines previous agent outputs into one clean final response.",
            system_prompt=FINAL_ANSWER_SYSTEM_PROMPT,
            openrouter_client=openrouter_client,
        )
