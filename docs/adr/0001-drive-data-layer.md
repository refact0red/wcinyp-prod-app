# ADR 0001: Drive data layer with Postgres + Drizzle

## Context
- Drive tabs currently shared a static seed list in-code.
- We need a persistent, safe path to add/sync files (future OneDrive indexer), with dev/prod parity.
- We want type safety and migration discipline without overbuilding.

## Decision
- Use Postgres for both dev and prod.
- Use Drizzle ORM for schema, migrations, and type-safe queries.
- Keep seeds for local/demo fallback; prefer DB in normal flows.
- Model files as first-class: enums for type/status/collections; packets/automations tables as light placeholders.

## Consequences
- Dev setup requires Docker (or local Postgres) and running `db:up/migrate/seed`.
- All schema changes go through Drizzle migrations; no ad-hoc DDL.
- Future OneDrive indexer will populate `files` and set `collections` to include `public` plus `external_link`.
- UI can fall back to seeds if DB is unavailable, but DB is the expected source.
