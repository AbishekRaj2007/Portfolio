// Load environment variables from a .env file into process.env
// Using ESM-safe import so this works with `type: "module"` in package.json
import "dotenv/config";
// Log NODE_ENV early for visibility during startup
console.log(process.env.NODE_ENV);

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  // `reusePort` is not supported on all platforms (notably some Windows setups).
  // Only set it when the platform supports it.
  const listenOptions: any = { port, host: "0.0.0.0" };
  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }

  // Attempt to listen, and if the port is in use try the next port a few times.
  const maxRetries = 5;
  let attempt = 0;

  const tryListen = (p: number) => {
    attempt += 1;

    const onError = (err: any) => {
      if (err && err.code === "EADDRINUSE") {
        log(`port ${p} is in use`);
        server.removeListener("error", onError);
        if (attempt <= maxRetries) {
          const next = p + 1;
          log(`trying port ${next} (attempt ${attempt}/${maxRetries})`);
          tryListen(next);
        } else {
          log(`failed to bind after ${maxRetries} attempts`);
          process.exit(1);
        }
      } else {
        // rethrow other errors
        throw err;
      }
    };

    server.once("error", onError);

    const opts: any = { port: p, host: listenOptions.host };
    if (listenOptions.reusePort) opts.reusePort = listenOptions.reusePort;

    server.listen(opts, () => {
      server.removeListener("error", onError);
      log(`serving on port ${p}`);
    });
  };

  tryListen(port);
})();
