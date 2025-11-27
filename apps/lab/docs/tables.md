# Table patterns

Shared table utilities live in `src/components/table`. They wrap TanStack Table v8 with a consistent toolbar, bulk actions, pagination, and optional virtualization.

## Core hook
- `useDataTable<TData>({ data, columns, stateKey, getRowId, initialState, meta, manualPagination, manualSorting, manualFiltering, onStateChange })`
- State that persists when `stateKey` is set: sorting, column filters, column visibility, global filter, pagination, column pinning/order/sizing. Call `resetState` to clear and reset.
- Pass `onStateChange` when using server-driven data; it receives the persistable state so you can fetch (`manualPagination`/`manualFiltering`/`manualSorting` should be `true` in that case).
- Defaults: column resize mode `onChange`, row selection enabled, default page size 10, and a bounded default column sizing.

## UI kit
- `TableToolbar`: global search + optional select filters + column visibility + reset + slot for extra actions (e.g., virtualization toggle, export).
- `BulkActionsBar`: appears when rows are selected; plug in your buttons.
- `TableShell`: wrapper for borders/sticky header.
- `TablePagination`: pager + page-size selector.
- `VirtualTable`: uses `@tanstack/react-virtual` for large datasets; provide header/row renderers.
- `EmptyState` and `TableSkeleton` for loading/empty cases.

## Usage checklist
1. Define `columns: ColumnDef<TData>[]` and `getRowId`.
2. Call `useDataTable` with a unique `stateKey` per route to persist view settings.
3. Wrap the table in `TableShell`; render `TableToolbar` above and `TablePagination` below.
4. Add `BulkActionsBar` when selection matters; feed bulk action buttons via `actions`.
5. Turn on virtualization (`VirtualTable`) when rows are large (>200) or when rendering expensive cells.
6. For server mode, pass `manualPagination`/`manualFiltering`/`manualSorting` and fetch in `onStateChange` using the table state snapshot.

## Patterns per screen
- Dashboard outline: row reordering via dnd-kit, actions pinned right, optional virtualization toggle for long outlines.
- Directory: global search + team filter, pagination, column visibility presets that hide location on small screens.
- Drive: status/type filters, actions pinned right, virtualization on by default for larger drives, and bulk download/delete hooks.
