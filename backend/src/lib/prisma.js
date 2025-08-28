// backend/src/lib/prisma.js
// Single Prisma client instance + runtime URL that disables prepared statements
// Works with your generated client at ../generated/prisma/index.js

import { PrismaClient } from "../generated/prisma/index.js"; // keep your path

function withPgBouncerFlags(url) {
  if (!url) return url;
  // If flags already present, do nothing
  if (url.includes("pgbouncer=true")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}pgbouncer=true&connection_limit=1`;
}

// Build the runtime datasource URL from env and append flags safely
const RUNTIME_DB_URL = withPgBouncerFlags(process.env.DATABASE_URL);

// Reuse a single instance in dev to avoid multiple clients
const g = globalThis;
export const prisma =
  g.__PRISMA__ ||
  new PrismaClient({
    datasources: RUNTIME_DB_URL ? { db: { url: RUNTIME_DB_URL } } : undefined,
    // optional: keep or remove query logging
    // log: ["query"],
  });

if (!g.__PRISMA__) g.__PRISMA__ = prisma;

// Cleanly disconnect on process end
process.on("beforeExit", async () => {
  try {
    await prisma.$disconnect();
  } catch {}
});
