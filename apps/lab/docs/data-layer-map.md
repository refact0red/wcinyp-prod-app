# Data layer map (labs app)

This document sketches the core data models that the labs app uses for WCINYP locations and staff, and how they relate.

## Locations (`src/lib/wcinyp/locations.ts`)

- `WcinypLocation`
  - `id`: stable internal identifier.
  - `slug`: URL segment for `/directory/locations/[slug]`.
  - `shortCode`: primary short code (e.g. `WGC`, `DHK`).
  - `akaShortCode?`: alternate/display short code (e.g. `BROADWAY`, `61ST`, `55TH`).
    - TODO: Align `id` / `slug` / `shortCode` / `akaShortCode` into a clearer set of identifiers and display codes.
  - `name`: full display name (e.g. `Weill Greenberg Center`).
  - `region`: WCINYP region label.
  - `borough`: borough (Manhattan / Queens).
  - `address`: `{ line1, line2?, crossStreets? }`.
  - `city`, `state`, `zip?`.
  - `modalities`: list of modality labels (e.g. `MRI`, `CT`).
  - `maps`: `{ placeUrl, lat, lng }` (Google Maps deep-link + coordinates).
  - `image`: `{ src, alt }` (location hero image).
  - `contact?`: `WcinypLocationContact`
    - `phone?`: `WcinypPhoneGroup` (main site number + optional extensions/other lines).
    - `fax?`: `WcinypPhoneGroup`.
    - `notes?`: freeform contact notes.
  - `hoursOfOperation?`: `WcinypHoursOfOperation`
    - `timezone`: `"America/New_York"`.
    - `ranges`: `WcinypHoursRange[]` – grouped by shared day/time spans, e.g. Mon–Fri 07:30–20:00, Sat 07:30–19:00.
    - Days not present in any range are considered closed.
    - TODO: integrate WCINYP holiday calendar to allow per-site overrides (closed/limited hours on specific holidays).
  - `contrastHours?`: `WcinypContrastHours`
    - `status`: `"text" | "tbd" | "n/a"`.
      - `"tbd"`: shown as “TBD”.
      - `"n/a"`: interpreted as “contrast available during all open hours”.
      - `"text"`: uses `value` (e.g. Spiral gap).
    - `value?`: freeform description when `status === "text"`.
    - TODO: later model structured contrast windows per day (similar to `hoursOfOperation`).
  - `hasSpecialist`: boolean flag indicating whether the site has a practice specialist role.
    - Spiral sets `hasSpecialist = false`; cards omit the PS line and full page renders “Practice specialist: N/A”.
  - `managerStaffId?`: foreign key to `WcinypStaffMember.id` (practice manager).
  - `specialistStaffId?`: foreign key to `WcinypStaffMember.id` (practice specialist), only when `hasSpecialist` is true.
  - `locationNotes?`: `WcinypLocationNote[]`
    - `id`: stable note id.
    - `text`: human-readable note.
    - `relatedFields?`: tags to connect notes to specific parts of the model, e.g. `["hoursOfOperation"]`, `["contrastHours"]`, `["staff"]`, or `"general"`.

- `WcinypWeekday`
  - `"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"`.

- `WcinypHoursRange`
  - `days`: `WcinypWeekday[]` (grouped days that share open/close times).
  - `open`: `"HH:MM"` 24-hour string (e.g. `"07:30"`).
  - `close`: `"HH:MM"` 24-hour string (e.g. `"20:00"`).

- `WcinypLocationNoteField`
  - `"contact" | "hoursOfOperation" | "contrastHours" | "staff" | "general"`.

## Phones (`src/lib/wcinyp/phones.ts`)

- `WcinypPhoneNumber`
  - `digits`: digits-only representation (e.g. `"6469623330"`).

- `WcinypPhoneGroup`
  - `primary`: `WcinypPhoneNumber` – main dialable number.
  - `extensions?`: string[] – extension fragments that share the primary line (e.g. `["9288", "9289"]` for `646.962.9729/9288/9289`).
  - `others?`: `WcinypPhoneNumber[]` – additional full numbers with different bases.

- Helpers
  - `createPhoneNumber(value: string)`: strips non-digits and wraps a `WcinypPhoneNumber`.
  - `formatPhoneDigits(digits: string)`: formats digits as `123.456.7890` when length is 10; otherwise returns the cleaned digits.
  - `formatPhoneGroup(group?: WcinypPhoneGroup)`: renders `primary` with dots and appends `/ext` & `/other` segments.
  - `phoneHref(digits: string)`: builds a `tel:` href from digits.

UI usage:
- Directory location cards and full location pages use `formatPhoneGroup` for display and `phoneHref` for dial links (primary only).
- Admin staff/locations forms accept raw digits and extensions, then normalize into these shapes.

## Staff (`src/lib/wcinyp/staff.ts`)

- `WcinypStaffMember`
  - `id`: stable staff id (string; used from locations via `managerStaffId` / `specialistStaffId`).
  - `name`: full name.
  - `role`: `"Practice Manager" | "Practice Specialist" | "Senior Patient Coordinator"`.
  - `email?`: contact email.
  - `officePhone?`: `WcinypPhoneGroup` (main office line + optional extensions).
  - `mobilePhone?`: `WcinypPhoneGroup` (typically just a primary digits value).
  - `primaryLocationId`: `WcinypLocation.id` for the main site.
  - `secondaryLocationIds?`: string[] of additional locations where the staff member regularly covers or rotates.
    - DHK and 55th share manager/specialist records via `secondaryLocationIds`.
    - Spiral is modeled as its own location; future coverage mapping will reflect that current staff have main sites elsewhere.
  - `status`: `"active" | "inactive"`.

- Relationships
  - Each location can link to:
    - `managerStaffId` → one `WcinypStaffMember` with `role = "Practice Manager"`.
    - `specialistStaffId` → one `WcinypStaffMember` with `role = "Practice Specialist"` (when `hasSpecialist`).
  - Staff records also point back to locations:
    - `primaryLocationId` always set for Practice Managers and (eventually) SPCs.
    - `secondaryLocationIds` capture dual-site or coverage patterns (e.g. DHK + 55th).

- TODOs
  - Add SPCs and other admin staff roles to this dataset.
  - On account registration, capture a user’s title and link only certain roles (PM, SPC, Specialist) to a location.
  - Model Spiral coverage more explicitly (primary site elsewhere + Spiral as a coverage location on specific days).

## Where the data is used

- Directory locations list (`src/components/shadcn/directory-locations-list.tsx`)
  - Uses `WcinypLocation` plus `wcinypStaff` to render:
    - Location card with image, address, modalities.
    - Bottom-left footer: T/F using `contact.phone`/`contact.fax`, and PM/PS names.
    - For Spiral (`hasSpecialist = false`), the PS line is omitted.

- Location detail page (`src/app/directory/locations/[slug]/page.tsx`)
  - Looks up a `WcinypLocation` by `slug` and joins in staff via `managerStaffId` / `specialistStaffId`.
  - Renders:
    - Contact & hours block using `contact`, `hoursOfOperation`, and `contrastHours`.
    - Practice leadership block using staff (PM + PS), respecting `hasSpecialist` (Spiral shows PS as N/A on the full page).
    - Additional notes from `locationNotes`.
    - Modalities as badges.

- Admin locations (`src/app/admin/locations/page.tsx`)
  - Edits location primitives (address, slug, modalities, map, image).
  - TODO: extend to surface and eventually edit `contact`, `hoursOfOperation`, `contrastHours`, `hasSpecialist`, and staff links.

- Admin staff (`src/app/admin/staff/page.tsx`)
  - New admin surface that lists `wcinypStaff` and allows editing:
    - Name, role, email.
    - Primary location.
    - Office/mobile digits and office extensions.
    - Status.
  - Uses `wcinypLocations` to show human-readable location names.

