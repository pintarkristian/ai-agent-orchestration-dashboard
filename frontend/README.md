# Frontend

React + TypeScript frontend for the AI Agent Orchestration Dashboard.

## Included

- Vite React application
- TypeScript
- Tailwind CSS
- Axios API client
- TanStack Query provider
- React Router pages
- React Flow dependency prepared for a future workflow visualization milestone
- Clean responsive dashboard layout
- Workflow run form connected to `POST /api/workflows/run`
- Final answer and per-agent step result cards

## Pages

- Dashboard: project overview and backend health status
- Workflow Run: task input form, backend workflow submission, loading/error states, final answer, and per-agent step cards
- Workflow History: table foundation for saved workflow runs

## Components

- `AppLayout`
- `Header`
- `Sidebar`
- `Card`
- `StatusBadge`
- `LoadingState`
- `ErrorState`

## Local Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend expects the backend API at `http://localhost:8000` by default. Start the backend first with:

```bash
cd backend
python -m uvicorn app.main:app --reload
```
