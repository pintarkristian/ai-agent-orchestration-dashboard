# Backend

Python FastAPI backend foundation for the AI Agent Orchestration Dashboard.

## Prepared For

- FastAPI application structure
- Pydantic settings, schemas, and core orchestration data models
- Async HTTP requests with `httpx`
- OpenRouter API client foundation
- Base agent plus specialized planner, research, architect, developer, reviewer, and final answer agents
- Simple Planner Agent execution endpoint
- SQLite database configuration foundation
- Pytest-based testing

## Local Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and set your OpenRouter values when you are ready to call the API:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_TIMEOUT_SECONDS=60
```

Run the API:

```bash
python -m uvicorn app.main:app --reload
```

Health check:

```bash
curl http://localhost:8000/health
```

Run the planner agent endpoint:

```bash
curl -X POST http://localhost:8000/api/agents/planner/run \
  -H "Content-Type: application/json" \
  -d '{"task": "Create an AI agent orchestration dashboard"}'
```

Run tests:

```bash
pytest
```

The OpenRouter and agent tests use mocks, so they do not call the real OpenRouter API.
