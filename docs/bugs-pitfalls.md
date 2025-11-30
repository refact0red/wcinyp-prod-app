# Bugs & Pitfalls

## Drive page: React state update before mount
- **Symptom:** Console warning “Can't perform a React state update on a component that hasn't mounted yet” when loading `/drive` (React 19 + Turbopack).
- **Root cause:** Drive table reset ran on first render and persisted state hydration fired multiple `setState` calls before mount; combined with React 19’s interrupted renders, updates targeted an unmounted tree. History provider also used multi-setter effects under `Suspense`, increasing risk.
- **Fix:** Guard drive table resets to run only after mount and when mode changes; gate persistence hydrate/write to post-mount and use a reducer for table state to batch updates; refactor history provider to a reducer with navigation guards.
- **Status:** Fixed in this patch; recheck `/drive` dev console if similar warnings reappear after future table/history changes.
