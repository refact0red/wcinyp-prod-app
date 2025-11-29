# Typography research – Inter, pairings, and implementation

## Current setup

- **Main app**
  - Uses `next/font/google` to load **Inter** as the primary UI font via `--font-inter` (`apps/main/src/app/layout.tsx:1`).
  - Defines typography tokens in `@theme` (`apps/main/src/styles/theme.css:1`), including:
    - `--font-body` / `--font-display`: `var(--font-inter, "Inter"), -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.
    - `--font-mono`: `ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
  - Uses opinionated prose/heading styles in `apps/main/src/styles/typography.css`.

- **Labs app**
  - Now also uses `next/font/google` Inter, exposed as `--font-inter` in `apps/lab/src/app/layout.tsx:1`.
  - `html, body` use:
    - `font-family: var(--font-inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");` (`apps/lab/src/styles/globals.css:43`).
  - Colors/radius/sidebar tokens follow shadcn/tweakcn’s OKLCH setup (`apps/lab/src/styles/globals.css:1`).

## Inter font characteristics

- Inter is a **sans-serif UI typeface** (Grotesk classification), designed for screen use.
- It ships as a **variable font** (weight axis 100–900) plus static instances.
- There is **no mono or serif version of Inter**:
  - No official “Inter Mono” or “Inter Serif” families.
  - Some stylistic alternates exist (e.g. cv08 for uppercase I with serif), but they are still part of the same sans-serif family.

## Recommended pairings for Inter

There is no official pairing list on the Inter site or Google Fonts specimen, but common and practical pairings (aligned with Untitled UI and modern web practice) are:

- **Sans (UI / body)**
  - Keep using Inter as the primary sans, with a robust system fallback:
    - `var(--font-inter, "Inter"), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.

- **Mono (code, IDs, tabular data)**
  - Use a stack that favors **Roboto Mono** but falls back gracefully:
    - `ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
  - This is what the Main app already uses as `--font-mono` and matches Untitled UI’s React starter.

- **Serif (long-form reading, special headings)**
  - There is no Inter serif, so use a conventional, always-available system serif stack:
    - `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`.
  - This matches Tailwind’s default serif stack and plays well with Inter.

## Implementation notes for Labs

### 1. Loading Inter

- Use `next/font/google` (as already done in Labs and Main):
  - Build-time fetch and bundling of font files.
  - Self-hosted; the browser only hits the app’s own origin (no runtime dependency on `fonts.googleapis.com` / `fonts.gstatic.com`).
  - `display: "swap"` for fast, readable text (no FOIT).
  - Good behavior on constrained networks (e.g., hospital environments) where external font CDNs may be blocked.

### 2. Global font application

- Labs currently applies Inter via:
  - `const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });` (`apps/lab/src/app/layout.tsx:4`).
  - `<body className={`${inter.variable} bg-background text-foreground antialiased`}>` (`apps/lab/src/app/layout.tsx:26`).
  - `html, body { font-family: var(--font-inter, system-ui, ...); }` (`apps/lab/src/styles/globals.css:43`).

This ensures:

- Consistent UI typography across OS/devices (Inter where available).
- Robust fallback to system sans when Inter cannot be loaded.

### 3. Suggested font tokens for Labs (future refinement)

To align Labs with Main and Untitled UI, and to give Tailwind/shadcn a complete font token set, we can later define:

- `--font-sans`:

  ```css
  --font-sans: var(--font-inter, "Inter"), system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  ```

- `--font-mono`:

  ```css
  --font-mono: ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;
  ```

- `--font-serif`:

  ```css
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  ```

These would then be wired into Tailwind’s `fontFamily` config (for `font-sans`, `font-mono`, `font-serif`) or mapped via `@theme` so utility classes use the right stacks.

## TODOs / open questions

- Decide on and implement final **mono** and **serif** tokens for Labs:
  - Likely: `Roboto Mono` for mono, and the standard system serif stack above.
- Optionally introduce typography helpers similar to Main’s `typography.css` if Labs needs rich prose layouts.
- Revisit this document whenever we:
  - Add new language support (may require different font subsets or families).
  - Adjust heading/body scales or letter-spacing.

