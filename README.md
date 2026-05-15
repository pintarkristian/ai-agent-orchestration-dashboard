# AI Agent Orchestration Dashboard

**AI Agent Orchestration Dashboard** is a full-stack portfolio project that demonstrates how multiple AI agents can work together to solve complex tasks. The project is built with a **Python FastAPI backend**, **OpenRouter API integration foundation**, and a **React + TypeScript frontend** prepared to visualize the orchestration process.

The goal of this repository is to demonstrate practical skills in **Python development**, **AI API integration**, **multi-agent workflow architecture**, **backend API design**, and **modern frontend development**.

## Project Idea

Instead of sending one prompt to one AI model, this application will eventually run a small team of specialized AI agents. Each agent will have a specific role and contribute part of the final answer.

Example future agents could include:

- **Planner Agent** — breaks the user request into smaller tasks
- **Research Agent** — gathers and summarizes information
- **Developer Agent** — writes technical solutions or code
- **Reviewer Agent** — checks the result for quality, bugs, and missing details
- **Final Answer Agent** — combines everything into one clean final response

The backend will coordinate agents, decide execution order, send requests to OpenRouter, store intermediate outputs, and return structured results. The frontend will display the process visually so users can see how the agents work together.

## Repository Structure

```text
ai-agent-orchestration-dashboard/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/             # API route modules
│   │   ├── core/            # Configuration and shared settings
│   │   ├── db/              # Database session foundation
│   │   ├── models/          # Future database models
│   │   ├── schemas/         # Future Pydantic request/response schemas
│   │   └── services/        # Future service integrations, including OpenRouter
│   ├── tests/               # Pytest test suite
│   ├── .env.example         # Backend environment variable template
│   ├── pyproject.toml       # Python tooling configuration
│   └── requirements.txt     # Backend dependencies
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   │   ├── api/             # Axios API client setup
│   │   ├── components/      # Future reusable UI components
│   │   ├── features/        # Future feature-based frontend modules
│   │   ├── pages/           # Page-level components
│   │   ├── styles/          # Tailwind/global styles
│   │   └── types/           # Future shared TypeScript types
│   ├── .env.example         # Frontend environment variable template
│   ├── package.json         # Frontend dependencies and scripts
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── vite.config.ts       # Vite configuration
├── docs/                    # Architecture and development notes
├── .gitignore               # Python, Node, build, log, venv, and env ignores
├── LICENSE
└── README.md
```

## Backend Foundation

The backend is prepared for:

- FastAPI
- Pydantic and pydantic-settings
- Async HTTP requests with `httpx`
- OpenRouter API integration foundation
- SQLite with SQLAlchemy async support and `aiosqlite`
- Pytest testing

Run locally:

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

## Frontend Foundation

The frontend is prepared for:

- React
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- React Flow

Run locally:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` by default and expects the backend API at `http://localhost:8000`.

## Current Scope

This version focuses only on a clean and professional project foundation. It does not implement agent orchestration business logic yet.

Planned future work includes:

1. OpenRouter chat completion integration
2. Agent role definitions
3. Sequential and parallel orchestration workflows
4. SQLite workflow run history
5. React Flow workflow visualization
6. Real-time workflow status updates
7. Docker support
