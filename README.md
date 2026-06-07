# Farmova

A Next.js app with a tenant login and a protected dashboard.

## Run locally

```bash
npm install
cp .env.example .env.local   # then edit the credentials
npm run dev
```

Open http://localhost:3000 and click **Tenant sign in**.

Default credentials (override via `.env.local`):

| Field    | Value                |
| -------- | -------------------- |
| Tenant   | `farmova`            |
| Username | `admin@farmova.app`  |
| Password | `Farmova@2026!`      |

## Deploy to Vercel

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Import the **Farmova** repository.
3. Vercel auto-detects Next.js — no build config needed.
4. (Recommended) Under **Environment Variables**, add the keys from
   `.env.example` with your own values, especially a long random
   `FARMOVA_AUTH_SECRET`.
5. Click **Deploy**. Every push to the branch redeploys automatically.

If you skip step 4, the app still runs using the built-in default
credentials above — fine for a demo, but set real values for anything public.

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
