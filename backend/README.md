# Backend

Python FastAPI backend foundation for the AI Agent Orchestration Dashboard.

## Prepared For

- FastAPI application structure
- Pydantic settings and schemas
- Async HTTP requests with `httpx`
- OpenRouter API client foundation
- SQLite database configuration foundation
- Pytest-based testing

## Local Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
```

Health check:

```bash
curl http://localhost:8000/health
```

Run tests:

```bash
pytest
```
