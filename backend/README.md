# Backend

Python FastAPI backend foundation for the AI Agent Orchestration Dashboard.

## Prepared For

- FastAPI application structure
- Pydantic settings and schemas
- Async HTTP requests with `httpx`
- OpenRouter API client foundation
- Async SQLite access through SQLAlchemy + aiosqlite
- Pytest-based testing

## Local Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Health check:

```bash
curl http://localhost:8000/api/health
```

Run tests:

```bash
pytest
```
