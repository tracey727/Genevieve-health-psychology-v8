import assert from "node:assert/strict";

const baseUrl = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const body = await response.text();
  assert.equal(response.ok, true, `${path} returned ${response.status}: ${body.slice(0, 300)}`);
  return { response, body };
}

for (const route of [
  "/",
  "/irene?demo=director",
  "/staff?demo=psychologist",
  "/reception?demo=reception",
  "/demo/index.html",
]) {
  const { body } = await request(route);
  assert.match(body, /GENEVIEVE/i, `${route} did not render GENEVIEVE branding`);
}

const health = JSON.parse((await request("/api/health")).body);
assert.equal(health.ok, true);
assert.equal(health.build, "2026.07.18.8-vercel");

const marker = `Vercel smoke ${Date.now()}`;
const staffHeaders = {
  "content-type": "application/json",
  "x-genevieve-demo-user": "psychologist",
};
const directorHeaders = {
  "content-type": "application/json",
  "x-genevieve-demo-user": "director",
};

const sent = JSON.parse((await request("/api/messages", {
  method: "POST",
  headers: staffHeaders,
  body: JSON.stringify({
    subject: marker,
    body: "Fictional deployment verification message.",
    category: "operational",
    priority: "normal",
  }),
})).body);
assert.equal(sent.ok, true);

const messages = JSON.parse((await request("/api/messages", { headers: directorHeaders })).body);
assert.equal(messages.messages.some((message) => message.subject === marker), true);

console.log(`Smoke test passed for ${baseUrl}`);
