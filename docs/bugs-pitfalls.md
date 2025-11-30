# Bugs & Pitfalls

## Drive page: React state update before mount
- **Symptom:** Console warning “Can't perform a React state update on a component that hasn't mounted yet” when loading `/drive` (React 19 + Turbopack).
- **Root cause:** Drive table reset ran on first render and persisted state hydration fired multiple `setState` calls before mount; combined with React 19’s interrupted renders, updates targeted an unmounted tree. History provider also used multi-setter effects under `Suspense`, increasing risk.
- **Fix:** Guard drive table resets to run only after mount and when mode changes; gate persistence hydrate/write to post-mount and use a reducer for table state to batch updates; refactor history provider to a reducer with navigation guards.
- **Status:** Fixed in this patch; recheck `/drive` dev console if similar warnings reappear after future table/history changes.

## Table persistence: infinite rehydrate loop
- **Symptom:** Runtime error “Maximum update depth exceeded” on `/dashboard` (stack points to `SelectTrigger` inside the outline `DataTable`).
- **Root cause:** `useDataTable` rehydration effect depended on the `initialState` object by reference. The outline table passed a fresh literal each render, and with a persisted state in `localStorage` the effect dispatched `hydrate` on every render, creating an infinite update loop.
- **Fix:** Memoize `initialState` inside `useDataTable` using a stable key so hydration runs once per real change. When adding tables with persistence, avoid passing inline `initialState` without a stable key/memo.
- **Status:** Fixed in `useDataTable` (Next 15.5.6 + Turbopack); clear persisted table state only if you still hit the loop after pulling this change.
