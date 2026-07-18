import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("creates a standard Next.js production build for Vercel", () => {
  assert.equal(existsSync(new URL("../.next/BUILD_ID", import.meta.url)), true);
  assert.equal(
    existsSync(new URL("../.next/server/app-paths-manifest.json", import.meta.url)),
    true,
  );

  const packageJson = JSON.parse(read("../package.json"));
  const vercel = JSON.parse(read("../vercel.json"));
  const appPaths = JSON.parse(read("../.next/server/app-paths-manifest.json"));
  const compiledRoutes = Object.keys(appPaths).join("\n");

  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.engines.node, "22.x");
  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.buildCommand, "npm run build");
  assert.match(compiledRoutes, /\/page/);
  assert.match(compiledRoutes, /\/irene\/page/);
  assert.match(compiledRoutes, /\/staff\/page/);
  assert.match(compiledRoutes, /\/reception\/page/);
  assert.match(compiledRoutes, /\/api\/health\/route/);
});

test("removes Cloudflare-only runtime dependencies", () => {
  const packageJson = read("../package.json");
  const database = read("../lib/database.ts");
  const hub = read("../lib/hub.ts");

  assert.doesNotMatch(packageJson, /vinext|wrangler|@cloudflare/);
  assert.doesNotMatch(database, /cloudflare:workers/);
  assert.doesNotMatch(hub, /cloudflare:workers|D1Database/);
  assert.match(database, /TURSO_DATABASE_URL/);
  assert.match(database, /file:\/tmp\/genevieve-irene-demo\.db/);
});

test("retains the connected safety, privacy and memory controls", () => {
  const safety = read("../app/api/safety/route.ts");
  const memory = read("../app/api/memory/route.ts");
  const messages = read("../app/api/messages/route.ts");
  const reception = read("../app/api/reception/route.ts");

  assert.match(safety, /Only a supervisor or authorised safety person may deactivate this alert/);
  assert.match(safety, /if \(!alert\.action_taken \|\| !alert\.actioned_at\)/);
  assert.match(safety, /lunch_break/);
  assert.match(safety, /high_support_load/);
  assert.match(safety, /age_transition/);
  assert.match(memory, /Only Irene’s director account can permanently purge/);
  assert.match(memory, /memory_permanently_purged/);
  assert.match(memory, /status_before_delete=status/);
  assert.match(messages, /recipient_email = \? OR recipient_role = \?/);
  assert.match(reception, /Reception does not make a clinical assessment/);
});
