# Frontend

React + TypeScript frontend foundation for the AI Agent Orchestration Dashboard.

## Included

- Vite React application
- TypeScript
- Tailwind CSS
- Axios API client
- TanStack Query provider
- React Router pages
- React Flow dependency prepared for a future workflow visualization milestone
- Clean responsive dashboard layout

## Pages

- Dashboard: project overview and backend health status
- Workflow Run: task input layout and planned execution preview
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

The frontend expects the backend API at `http://localhost:8000` by default.
