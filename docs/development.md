# Development Notes

## Backend

The backend is located in `backend/` and uses FastAPI. It includes a health endpoint, settings loader, async database session foundation, and an OpenRouter client wrapper prepared for future integration work.

## Frontend

The frontend is located in `frontend/` and uses Vite, React, TypeScript, Tailwind CSS, Axios, TanStack Query, and React Flow.

## Environment Files

Copy the example environment files before running locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Do not commit real `.env` files or API keys.
