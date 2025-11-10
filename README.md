# Abishek Raj — Personal portfolio

A Vite + React (TypeScript) portfolio and minimal Node server for demoing projects and experiences.

## Highlights

- Clean, component-driven UI with Tailwind CSS and Framer Motion
- Server-side code for any API endpoints under `server/`
- Uses Drizzle ORM for database wiring (if needed)

## Prerequisites

- Node 18+ and npm (or pnpm)

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

## Contributing

Feel free to open issues or PRs. Keep changes focused and add a short description of intent.

## License

MIT

## Notes

You may see a harmless PostCSS warning during build about a missing `from` option — this does not break the build but can be silenced by updating PostCSS plugin configs.
 cross-platform compatibility.
