# Vercel and GitHub deployment checklist

## Repository

- [ ] Repository is private.
- [ ] `package.json`, `app/`, `public/` and `vercel.json` are visible at the
      repository root.
- [ ] There is no extra folder above `package.json`.
- [ ] `node_modules`, `.next`, `.env` and database files are not committed.
- [ ] GitHub Actions **Verify Vercel build** is green.

## Vercel project

- [ ] Correct private GitHub repository imported.
- [ ] Framework Preset is **Next.js**.
- [ ] Root Directory is `./`.
- [ ] Output Directory is blank.
- [ ] Node.js version resolves to 22.x from `package.json`.
- [ ] Deployment status is **Ready**.

## Shared demo data

- [ ] Turso Cloud storage integration added for cross-device persistence.
- [ ] `TURSO_DATABASE_URL` supplied in Vercel.
- [ ] `TURSO_AUTH_TOKEN` supplied in Vercel.
- [ ] Project redeployed after storage settings were added.
- [ ] `/api/health` reports `persistent-turso`.

## Trial verification

- [ ] `/api/health` reports build `2026.07.18.8-vercel`.
- [ ] Irene dashboard opens.
- [ ] Psychologist staff app opens on a phone.
- [ ] Provisional psychologist staff app opens.
- [ ] Reception base opens.
- [ ] Wider practice dashboard opens.
- [ ] Fictional staff message appears on Irene's dashboard.
- [ ] Irene's fictional assignment appears in the correct staff view.
- [ ] Lunch alert action cannot close without authorised supervisor sign-off.
- [ ] Memory proposal requires Irene's approval.
- [ ] Archive, restore and director-only permanent deletion work.
- [ ] No real or identifiable information has been entered.
