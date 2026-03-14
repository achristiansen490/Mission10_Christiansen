# Mission 10 Assignment (IS 413)

This project has two parts:
- `backend`: ASP.NET Core API (SQLite data source)
- `frontend`: React + Vite app

The frontend calls the backend endpoint `/api/bowlers` and displays bowlers on the **Marlins** and **Sharks** teams.

## Project Structure
- `backend/BowlingLeagueApi/BowlingLeagueApi`: ASP.NET project to run
- `backend/BowlingLeagueApi/BowlingLeagueApi/Data/BowlingLeague.sqlite`: database file
- `frontend`: React app to run with Vite

## Prerequisites
- .NET SDK 10
- Node.js + npm
- One IDE for backend (Rider or Visual Studio)
- VS Code (or terminal) for frontend

## Quick Start (Recommended for Grading)

Run backend and frontend in separate terminals/apps.

### 1. Start Backend (Rider or Visual Studio)
Open this project folder:
- `backend/BowlingLeagueApi/BowlingLeagueApi`

Run the app (`dotnet run` or IDE Run button).

If running from terminal at repo root, this command is the most reliable:

```bash
dotnet run --project "./backend/BowlingLeagueApi/BowlingLeagueApi/BowlingLeagueApi.csproj"
```

Expected backend URL:
- `http://localhost:5069`

Check it works:
- Open `http://localhost:5069/api/bowlers`
- You should see JSON output.

### 2. Start Frontend (VS Code terminal)
From repo root:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Notes About API Connection
- `frontend/vite.config.ts` proxies `/api` requests to `http://localhost:5069`.
- Keep backend running while testing frontend.

## Common Issues

### `npm ERR! ENOENT ... package.json`
You are in the wrong folder. Run frontend commands from:

```bash
cd frontend
```

### `Failed to fetch` in frontend
Backend is not running, or running on a different port.
- Confirm backend logs show `Now listening on: http://localhost:5069`.
- If port differs, update `frontend/vite.config.ts` proxy target.

### 404 from `/api/bowlers`
Backend started in wrong project folder.
Use:
- `backend/BowlingLeagueApi/BowlingLeagueApi`

### `The provided file path does not exist` (dotnet)
Use quotes if your path includes spaces and run with an explicit project path:

```bash
dotnet run --project "./backend/BowlingLeagueApi/BowlingLeagueApi/BowlingLeagueApi.csproj"
```

If needed, confirm the path first:

```bash
find . -name "BowlingLeagueApi.csproj"
```

## Build Commands (Optional)

Backend:

```bash
cd backend/BowlingLeagueApi/BowlingLeagueApi
dotnet build
```

Frontend:

```bash
cd frontend
npm run build
```
