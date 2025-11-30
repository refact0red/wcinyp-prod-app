# WCINYP Labs app

Internal platform for WCINYP coordinators and admins (Drive, Directory, workflows). This repo is the lab app at the root; Bun is the primary package manager.

## Stack
- Next.js 15, React 19, Tailwind v4, TypeScript.
- Bun for installs/runs; npm is a fallback only (use `--legacy-peer-deps` if you must because `cmdk@0.2.1` has a React 18 peer).
- Data: Postgres + Drizzle for Drive (files/packets/automations). Dev DB via Docker compose.

## Getting started
```bash
bun install
cp .env.example .env            # sets DATABASE_URL for local Postgres
bun run db:up                   # start Postgres via docker compose
bun run db:migrate              # apply schema (drizzle-kit push)
bun run db:seed                 # load Drive seeds (truncates files)
bun run dev                     # Next dev on port 4000
```
Open http://localhost:4000.

> If you need npm: `npm install --legacy-peer-deps` then use the same db/dev script names.

## Drive data layer
- Commands: `bun run db:up` / `db:down` / `db:migrate` / `db:seed`.
- Docs: `docs/drive-data.md`
- ADR: `docs/adr/0001-drive-data-layer.md`

## Docs index
- `docs/data-layer-map.md`: WCINYP locations/staff model overview and usage.
- `docs/tables.md`: current tables reference.
- `docs/drive-data.md`: Drive schema, migrations, seeds, commands, and future OneDrive indexer notes.
- `docs/adr/0001-drive-data-layer.md`: decision record for Postgres + Drizzle Drive data layer.
- `docs/typography-research.md`: type pairing notes (research/reference).

## Notes
- Public Drive integration is future work; current Drive seeds use local PDFs, with DB as the primary source and seed fallback.
- Run `bun run db:down` to stop the local Postgres container (volume persists unless pruned).
