# Deployment

This project is configured for an Autoscale deployment. The Express service serves both the API and the production Vite site from one process.

## Commands

- Build: `pnpm run build`
- Start: `pnpm start`
- Test: `pnpm run test`
- Production dependency audit: `pnpm run audit:prod`
- Full release check: `pnpm run release:check`

The deployment build and start commands are also declared in `.replit`.

## Environment settings

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | Set by the deployment host | HTTP port used by the Express service. Defaults to `5000` locally. |
| `BASE_PATH` | No | Public base path for the Vite site. Defaults to `/`. |
| `DATABASE_URL` | Only when database-backed API routes are enabled | PostgreSQL connection string. Do not commit this value. |

## Before release

1. Run `pnpm run typecheck`, `pnpm run test`, and `pnpm run build`.
2. Run `pnpm run audit:prod` in approved CI or a trusted security scanner.
3. Confirm the release commit and production environment values in source control and the hosting dashboard.
4. Configure an email-delivery provider and API endpoint before treating website enquiries as delivered.
