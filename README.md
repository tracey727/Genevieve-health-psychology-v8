> **Historical / reference build.** This July psychology prototype is superseded for current development by [ON-TRACK-Psychological-Command-Centre](https://github.com/tracey727/ON-TRACK-Psychological-Command-Centre). Preserve this repository for provenance and recovery; do not use it as the current production/deployment source.\n\n# GENEVIEVE HEALTH™ — Irene Psychology Practice Safety Demo

Vercel/GitHub build: `2026.07.18.8-vercel`

This is the connected fictional demonstration for Irene, authorised staff and
reception. It includes two-way messages, assignments, workload and lunch-break
protection, safety escalation and sign-off, role-filtered views, reception
workflows, and director-controlled practice memory, learning, archive, restore
and permanent deletion.

## Important trial boundary

This package is a controlled demonstration. Use fictional or coded information
only. Do not enter therapy notes, diagnoses, identifiable client information,
real health records or emergency case information. It does not replace clinical
judgement, the practice management system, approved emergency procedures or a
production security review.

## What was repaired for Vercel

- Standard Next.js `dev`, `build` and `start` commands replace the previous
  Cloudflare Worker build.
- Cloudflare-only D1 imports were replaced with a Vercel-compatible libSQL
  database adapter.
- A root `vercel.json` identifies the Next.js build and Node.js functions.
- The package now targets Vercel-supported Node.js 22.x.
- Fictional demo identities work on a normal Vercel address without the former
  hosting platform's private sign-in headers.
- GitHub Actions runs a clean install and production build on every push and
  pull request.

## GitHub repository root

Extract the ZIP first. Upload the **contents inside the extracted folder** so
GitHub shows these items immediately at the top level:

```text
.github/
app/
lib/
public/
package.json
package-lock.json
next.config.ts
vercel.json
```

Do not upload the unopened ZIP as the only repository file. Do not place the
whole project inside an extra folder. Do not upload `node_modules` or `.next`.

For the controlled trial, use a **private** GitHub repository. A suitable name
is `irene-psychology-safety-demo`.

## Deploy through Vercel

1. In Vercel choose **Add New → Project**.
2. Import the private GitHub repository.
3. Confirm **Framework Preset: Next.js**.
4. Confirm **Root Directory: `./`**.
5. Leave **Output Directory** blank.
6. The included configuration uses **Install Command: `npm ci`** and
   **Build Command: `npm run build`**.
7. Deploy.
8. Open the exact URL shown on the completed Vercel deployment.

Vercel should automatically redeploy after later pushes to the connected GitHub
repository.

## Database modes

The app has two database modes:

- `temporary-demo` works immediately without extra credentials. It is suitable
  for checking screens and workflows, but data can reset when Vercel starts a
  new serverless instance and must not be treated as a shared permanent record.
- `persistent-turso` is required for reliable back-and-forth data across
  Irene's dashboard and several staff phones/computers. Add **Turso Cloud** from
  the Vercel Marketplace and provide `TURSO_DATABASE_URL` and
  `TURSO_AUTH_TOKEN` to Production, Preview and Development environments.

After adding or changing environment variables, redeploy the project.

## Verify the deployment

Open these addresses on the exact Vercel deployment URL:

- `/api/health` — must return `"ok": true` and build
  `2026.07.18.8-vercel`.
- `/` — role gateway.
- `/irene?demo=director` — Irene's dashboard.
- `/staff?demo=psychologist` — fictional psychologist phone app.
- `/staff?demo=provisional` — fictional provisional psychologist phone app.
- `/reception?demo=reception` — reception base.
- `/demo/index.html` — wider practice safety dashboard.

Then send a fictional message from the staff view and confirm it appears in
Irene's communications view. With persistent storage enabled, repeat the check
on two separate devices.

## Local verification

```bash
npm ci
npm test
npm run start
```

In a second terminal:

```bash
npm run test:smoke
```

## Before any real-person pilot

Keep `GENEVIEVE_DEMO_MODE=true` and
`NEXT_PUBLIC_GENEVIEVE_DEMO_MODE=true` for this fictional demo. Turning off demo
mode does not by itself provide production authentication. Irene's approved
identity provider, exact users, permissions, privacy/security settings,
retention, backups, incident response and professional/legal review must be
implemented before any real staff or client information is used.
