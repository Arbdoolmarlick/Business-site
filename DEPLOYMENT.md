# Deployment

The production website is a Vite static site. The root `vercel.json` builds the website and deploys `artifacts/ibrahimawa-global-farm/dist/public`.

## Commands

- Build: `pnpm run build`
- Start: `pnpm start`
- Test: `pnpm run test`
- Production dependency audit: `pnpm run audit:prod`
- Full release check: `pnpm run release:check`

For Vercel, keep the Project Root Directory set to the repository root. The prior failed deployment used `artifacts/api-server` as its root, which builds the API rather than the website.

## Environment settings

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No for Vercel static deployments | Port used when running the local API or development server. The API defaults to `5000`; Vite defaults to `5173`. |
| `BASE_PATH` | No | Public base path for the Vite site. Defaults to `/`. |
| `DATABASE_URL` | Only when database-backed API routes are enabled | PostgreSQL connection string. Do not commit this value. |
| `RESEND_API_KEY` | Yes, for website enquiries | Server-only Resend API key. Add it in Vercel, never with a `VITE_` prefix. |
| `RESEND_FROM_EMAIL` | Yes, for website enquiries | A verified Resend sender, e.g. `IGAF Enquiries <enquiries@yourdomain.com>`. |
| `INQUIRY_TO_EMAIL` | No | Gmail address that receives enquiries. Defaults to `ibrahimawafarms@gmail.com`. |

## Before release

1. Run `pnpm run typecheck`, `pnpm run test`, and `pnpm run build`.
2. Run `pnpm run audit:prod` in approved CI or a trusted security scanner.
3. Confirm the release commit and production environment values in source control and the hosting dashboard.
4. In Vercel, add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to the Production (and Preview, if needed) environment. The `/api/inquiry` serverless endpoint reads these values; they are never included in the client bundle.
