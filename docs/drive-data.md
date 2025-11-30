# Drive data layer (files, packets, automations)

This repo now has a Postgres-backed data layer for Drive. Drizzle manages schema and queries; seed data remains for local/demo fallback.

## What this powers
- Drive tabs are filtered views over the same `files` table (`collections` column).
- Packets/Automations are placeholder entities for now; Public Drive is deferred until the OneDrive indexer exists.

## Schema (Postgres via Drizzle)
- `files`: `id` UUID, `name`, `type` (enum), `status` (enum), `collections` (enum[]), `tags` (text[]), `size_label`, `size_bytes?`, `updated_at`, `href`, `external_link?` (OneDrive placeholder), `mime_type`, timestamps.
- `packets`: `id` UUID, `name`, `description`, timestamps.
- `packet_items`: `(packet_id, file_id)` PK, `required`, `notes`.
- `automations`: `id` UUID, `name`, `description`, `status`, `workflow_ref`, timestamps.

## Local setup
```sh
cp .env.example .env
bun run db:up           # starts Postgres via docker compose
bun run db:migrate      # applies Drizzle migrations
bun run db:seed         # truncates files, seeds documents/packets placeholders
bun run dev             # app reads Drive data from Postgres
```
- `db:down` stops/removes the container; the named volume (`pgdata`) persists unless you prune volumes.
- Drizzle files live in `drizzle/migrations/` with journaling under `drizzle/migrations/meta`.

## Migrations discipline
- Every schema change goes through Drizzle migration generation + apply.
- No hand edits to the DB; no raw `psql` DDL outside migrations.
- Use `bun run db:generate` to emit SQL from schema changes, then `db:migrate` to apply.

## Seeds
- `scripts/db/seed.ts` truncates and inserts the current file seeds (documents) plus packet placeholders; Automations are empty for now.
- Seeds are for dev/demo only. Prod will be fed by a future OneDrive sync/indexer.

## Data flow
- Server fetch: `fetchDriveFilesByMode` (Drizzle) → passes `DriveFile[]` into Drive client.
- UI still renders seeds if the DB is unavailable (fallback).

## Future: OneDrive indexer
- Plan: a worker/cron that scans Public Drive, writes rows into `files`, sets `collections` to include `public`, populates `external_link`, updates metadata (size, mime, timestamps).
- The UI already has a placeholder action for OneDrive links; enable it once the indexer is live.
