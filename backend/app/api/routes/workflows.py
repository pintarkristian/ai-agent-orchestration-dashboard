from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.models.workflow import WorkflowResult
from app.services.openrouter_client import OpenRouterClient
from app.services.orchestrator import SequentialOrchestrator

router = APIRouter(prefix="/api/workflows", tags=["workflows"])


class WorkflowRunRequest(BaseModel):
    """Request payload for running a sequential workflow."""

    task: str = Field(
        ...,
        min_length=1,
        description="User task to process through the full agent workflow.",
    )


def get_openrouter_client() -> OpenRouterClient:
    """Create the OpenRouter client dependency."""
    return OpenRouterClient()


def get_orchestrator(
    openrouter_client: OpenRouterClient = Depends(get_openrouter_client),
) -> SequentialOrchestrator:
    """Create the sequential orchestrator dependency."""
    return SequentialOrchestrator(openrouter_client=openrouter_client)


@router.post("/run", response_model=WorkflowResult)
async def run_workflow(
    request: WorkflowRunRequest,
    orchestrator: SequentialOrchestrator = Depends(get_orchestrator),
) -> WorkflowResult:
    """Run a task through the complete sequential agent workflow."""
    return await orchestrator.run(request.task)
