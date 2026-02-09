# Abishek Raj — Personal portfolio

A Vite + React (TypeScript) portfolio with a separate Express backend for API endpoints.

## Structure

This project is split into two deployable parts:

- `client/` - Vite + React frontend (deployable to Vercel, Netlify, etc.)
- `server/` - Express backend with API routes and database logic
- `shared/` - Shared types and schemas used by both client and server

## Prerequisites

- Node 18+ and npm (or pnpm)

## Development

You'll need to run both the client and server separately during development.

### Option 1: Run both from root (using two terminals)

**Terminal 1 - Frontend:**
```powershell
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

**Terminal 2 - Backend:**
```powershell
cd server
npm install
npm run dev
# Backend runs on http://localhost:5000
```

### Option 2: Install all dependencies at once

From the project root:
```powershell
cd client; npm install; cd ../server; npm install; cd ..
```

Then run each in separate terminals as shown above.

## Production Build

**Build Frontend:**
```powershell
cd client
npm run build
# Outputs to client/dist/
```

**Build Backend:**
```powershell
cd server
npm run build
# Outputs to server/dist/
```

**Run Production Server:**
```powershell
cd server
npm start
# Serves API and static frontend from client/dist/
```

## Deployment

### Frontend (Vercel/Netlify)
Deploy the `client/` folder as a static Vite app:
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `client`

### Backend (Render/Railway/Heroku)
Deploy the `server/` folder as a Node.js Express app:
- Build command: `npm run build`
- Start command: `npm start`
- Root directory: `server`

Make sure to set environment variables (DATABASE_URL, etc.) in your deployment platform.

## Static assets

Place static images into `client/public/`. Example: `client/public/logo.png` will be served at `/logo.png`.

## Database

The server uses Drizzle ORM. To push schema changes:

```powershell
cd server
npx drizzle-kit push
```

## Quick start (Windows PowerShell)

1) Install dependencies

```powershell
npm install
```

2) Run the development server (PowerShell)

This project uses a small Node server for SSR/preview. In PowerShell you can run the dev server with:

```powershell
# $env:NODE_ENV = 'development' # only needed if you run server directly
npm run dev
```

If you prefer a cross-platform env var helper, install `cross-env` and the provided `dev` script will work on all platforms.

3) Build for production

```powershell
npm run build
npm start
```

## Static assets

Place static images (icons used by cards, etc.) into the top-level `public/` folder. Example: `public/postdost.png` will be served at `/postdost.png`.

## Cleaning local state

This repository may create a local `.local/` folder for tooling state. Add `.local/` to `.gitignore` (already done) and run the following to remove tracked `.local` files from the repo if needed:

```powershell
# untrack previously committed .local files
git rm -r --cached .local
git commit -m "Remove .local files and ignore them"
git push origin main
```
