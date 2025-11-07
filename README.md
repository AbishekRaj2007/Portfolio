# AstroFolio (local development)

This repository is configured for local development with Node and Vite.

Quick start (Windows PowerShell):

1. Install dependencies

```powershell
npm install
```

2. Run the development server

The root `dev` script expects an environment variable `NODE_ENV=development` which is set differently on Windows. In PowerShell you can run the server with:

```powershell
$env:NODE_ENV = 'development'
npx tsx server/index.ts
```

Or install `cross-env` and update `package.json` to make `npm run dev` cross-platform.

3. Build for production

```powershell
npm run build
npm start
```

Notes
- Project is configured for local usage. If you prefer, you can re-add `cross-env` to devDependencies and update scripts for better cross-platform compatibility.
