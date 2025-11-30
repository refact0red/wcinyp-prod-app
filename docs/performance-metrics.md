# Web performance snapshot (Nov 30)

## Current route bundle sizes (First Load JS)
- Source: Next route size output on Nov 30; values below are First Load JS per route. Shared bundle across pages is 102 kB (chunks/255-a78b69fc76e8afca.js at 45.6 kB, chunks/4bd1b696-409494caf8c83275.js at 54.2 kB, other shared chunks 1.98 kB).
- `/`, `/dashboard`: 369 kB (heaviest coordinator surfaces; incremental over shared is ~267 kB).
- `/directory`: 253 kB.
- `/drive`: 219 kB.
- `/directory/locations/[slug]`: 184 kB.
- `/admin/locations`: 192 kB.
- `/admin/staff`: 183 kB.
- `/admin/feedback`: 180 kB.
- `/manual`, `/teams`, `/timesheet`, `/experimental/3d-models`: ~189 kB.
- `/experimental/button-compare`: 113 kB.
- `/_not-found`, `/api/npi-lookup`, `/icon.png`: 102 kB or lower.

## Targets
- Coordinator-first pages (`/`, `/dashboard`, `/directory`, `/drive`): First Load JS ≤ 220 kB; stretch 180–200 kB with sub-1.5s load on mid-tier laptops and clinic Wi‑Fi.
- Admin surfaces: ≤ 170 kB; acceptable to trade a bit more JS for tooling, but keep below coordinator pages.
- Experimental/rare surfaces: ≤ 150 kB if promoted to prod; otherwise dynamic-only so they do not affect primary bundles.
- Shared chunk: hold ≤ 120 kB; keep admin/experimental providers and modules out of the default layout so Members don’t pay for them.

## Recommended improvements
- Run bundle analysis (`ANALYZE=1 next build` or `next build --analyze`) to pinpoint top offenders on `/` and `/dashboard`; commit the reports or summaries here for traceability.
- Split home/dashboard panels with `next/dynamic` so heavy widgets (tables, charts, editors) load after shell render; ship light skeletons while data fetches.
- Trim large UI deps (full icon packs, chart libs, date libraries); replace with smaller primitives or on-demand imports to avoid shipping unused code.
- Move admin-only providers/components out of the default layout; keep Member-first shells lean and load admin chrome only when in `/admin`.
- For directory/drive, lazy-load maps and virtualized tables; ensure large data blobs come from server fetches rather than bundled JSON/static imports.
- Audit experimental pages: if they stay in prod, dynamic-load 3D/model assets and optional dependencies; if not needed, gate them behind feature flags to avoid shipping bytes.

## Tracking and guardrails
- Keep a snapshot of route metrics per release in this file; note any jumps with cause and fix to preserve auditability.
- Add a CI budget check to fail builds when First Load JS for coordinator pages regresses >10% above target.
- Validate perceived performance (TTFB, LCP) on typical clinic hardware/Wi‑Fi after bundle trims to confirm the app feels fast under pressure.
