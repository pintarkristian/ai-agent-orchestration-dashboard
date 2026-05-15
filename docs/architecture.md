# Architecture Notes

## Goal

AI Agent Orchestration Dashboard is a full-stack application that will coordinate multiple AI agents through a Python backend and visualize execution progress in a React dashboard.

## Planned High-Level Components

- **Frontend Dashboard**: React + TypeScript interface for launching workflows and visualizing agent execution.
- **Workflow Visualization**: React Flow will be used to display agents, dependencies, statuses, and outputs.
- **Backend API**: FastAPI service that will expose workflow, agent, run history, and health endpoints.
- **OpenRouter Integration**: Async HTTP client foundation is prepared for future calls to OpenRouter models.
- **Persistence Layer**: SQLite is prepared as the initial local database for workflow run history.

## Current Scope

This repository currently contains only the professional project foundation. Business logic, agent orchestration, workflow execution, database models, and production deployment configuration will be added in later milestones.
