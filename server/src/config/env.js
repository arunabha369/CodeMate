// Central place for environment-driven settings, so URLs and secrets are
// never hardcoded in routes.

const isProduction = process.env.NODE_ENV === "production";

const DEV_JWT_SECRET = "codemate-dev-only-secret";

const getJwtSecret = () => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (isProduction) {
    throw new Error("JWT_SECRET must be set when NODE_ENV=production.");
  }
  console.warn("JWT_SECRET is not set; using an insecure development secret. Set JWT_SECRET in server/.env.");
  return DEV_JWT_SECRET;
};

const stripTrailingSlash = (url) => url.replace(/\/+$/, "");

const parseList = (value) =>
  (value || "")
    .split(",")
    .map((s) => stripTrailingSlash(s.trim()))
    .filter(Boolean);

// The frontend the server redirects back to after OAuth sign-in.
const CLIENT_URL = stripTrailingSlash(process.env.CLIENT_URL || "http://localhost:5173");

// Origins allowed to call the API and open sockets with credentials.
const allowedOrigins = new Set([CLIENT_URL, ...parseList(process.env.ALLOWED_ORIGINS)]);

const isOriginAllowed = (origin) => {
  // Requests with no origin (curl, server-to-server, mobile apps).
  if (!origin) return true;
  if (allowedOrigins.has(stripTrailingSlash(origin))) return true;
  if (origin.startsWith("http://localhost:") || origin.endsWith(".netlify.app")) return true;
  return false;
};

// Shared by the Express CORS middleware and the Socket.io server.
const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

module.exports = {
  isProduction,
  JWT_SECRET: getJwtSecret(),
  CLIENT_URL,
  PORT: process.env.PORT || 7778,
  corsOptions,
};
