from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.workflow import WorkflowResult
from app.repositories.workflow_repository import WorkflowRepository
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


def get_workflow_repository(db: Session = Depends(get_db)) -> WorkflowRepository:
    """Create the workflow repository dependency."""
    return WorkflowRepository(db)


def get_orchestrator(
    openrouter_client: OpenRouterClient = Depends(get_openrouter_client),
    workflow_repository: WorkflowRepository = Depends(get_workflow_repository),
) -> SequentialOrchestrator:
    """Create the sequential orchestrator dependency."""
    return SequentialOrchestrator(
        openrouter_client=openrouter_client,
        workflow_repository=workflow_repository,
    )


@router.get("", response_model=list[WorkflowResult])
def list_workflows(
    workflow_repository: WorkflowRepository = Depends(get_workflow_repository),
) -> list[WorkflowResult]:
    """Return persisted workflow runs."""
    return workflow_repository.list_workflows()


@router.post("/run", response_model=WorkflowResult)
async def run_workflow(
    request: WorkflowRunRequest,
    orchestrator: SequentialOrchestrator = Depends(get_orchestrator),
) -> WorkflowResult:
    """Run a task through the complete sequential agent workflow and persist it."""
    return await orchestrator.run(request.task)


@router.get("/{workflow_id}", response_model=WorkflowResult)
def get_workflow(
    workflow_id: str,
    workflow_repository: WorkflowRepository = Depends(get_workflow_repository),
) -> WorkflowResult:
    """Return a persisted workflow run by id."""
    workflow = workflow_repository.get_workflow(workflow_id)
    if workflow is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Workflow '{workflow_id}' was not found.",
        )
    return workflow
