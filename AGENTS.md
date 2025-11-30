# AGENTS

Guidelines for automated agents working in this repo.

## Mission

- Build an internal platform that makes senior patient coordinators faster, more confident, and more consistent.
- Treat Drive, Manual, and Directory as one workspace that reduces context switching and centralizes operational knowledge.
- Demonstrate clear, compounding value—and the impact of a dedicated Admin stewarding this platform—so leadership wants to invest in both the product and the person responsible for it.

## Product principles

- Coordinators first: optimize for real, day-to-day workflows and decision points.
- One workspace: features are different views on the same underlying information, not separate apps.
- Next best step: surfaces what to do or use next, not just raw data.
- Impressive in practice: the tool should feel fast, cohesive, and obviously useful in a coordinator’s real day.

## Data model principles

- Treat the data model as the core product; design features around entities and relationships, not ad-hoc state.
- Prefer shared primitives (for example: `Resource`, `Workflow`, `Step`, `DirectoryEntry`, `Tag`, `Context`) that multiple features can reuse.
- When adding functionality, first ask which existing entities and relations this extends before creating new tables or structures.
- Model operational knowledge, workflows, and non-PHI metadata; connect to external systems via opaque IDs or links when needed.
- Design schemas to answer key questions easily: what is relevant in this scenario, what is blocked, who can help, and what changed.

## Roles and permissions

- Keep roles simple but explicit:
  - `Admin`: small set of users with full platform permissions, including everything `ContentAdmin` can do plus access to admin and experimental dashboards, system configuration, and privileged tooling.
  - `ContentAdmin`: trusted set of users with edit rights on resources, workflows, directory, and other canonical content, but without platform-level controls reserved for `Admin`.
  - `Member`: default for SPCs and managers; can view, work in the tool, and submit feedback, but cannot edit canonical content directly and have no admin dashboard access.
- Future roles (for example: `Manager`) may gain team/schedule powers, but `ContentAdmin` remains the primary editor of system-of-record content and `Admin` remains the owner of platform-level configuration.
- When implementing features, enforce edit operations at the role level; assume only `ContentAdmin` or `Admin` may create, update, or archive core entities, and only `Admin` may access admin/experimental dashboards and platform controls.

## Feedback and moderation

- Treat SPCs and managers as sensors and `ContentAdmin` users as editors/moderators.
- For each resource or workflow, support a fast, in-context way for Members to flag issues or suggest improvements.
- Model feedback explicitly (for example: `ResourceFeedback` with type, status, creator, timestamps, context, and optional note).
- Provide a centralized feedback inbox for `ContentAdmin` users to triage, respond, and close the loop.
- Whenever feasible, surface feedback status back to the reporting user so the system feels responsive and alive.

## Implementation guidelines

- Reduce context switching: avoid features that force coordinators to juggle many screens or systems; favor cross-linking and simple navigation.
- Favor speed and clarity over generic abstractions; keep components and APIs straightforward and task-oriented.
- Prefer incremental improvements to the shared model and UI patterns over one-off special-case implementations.
- For new work, update types/schemas first, then APIs/server logic, then UI; keep them aligned.
- Do not over-engineer; pick the simplest solution that respects the data model and keeps options open.
- When in doubt, ask: does this make the tool more useful to coordinators right now, or clarify the long-term platform?

## UX and navigation

- Design for mouse-first use, with keyboard as a powerful accelerator for people who want it; neither mode should feel second-class.
- Optimize for “under pressure” moments: the app should feel obvious and dependable even when someone only drops in occasionally or is trying to move very quickly.
- Keep navigation shallow and predictable: clear page titles, consistent layouts, and one or two primary actions per view so the app feels focused, not like a pile of features.
- Use cross-linking and contextual entry points (for example: from search to details to related workflows) so coordinators rarely have to wonder “where do I go next?”

## Command menu and global search

- Treat the global command/search menu as the primary “do anything” surface: experienced users should be able to start most tasks there.
- From the command menu, support jumping to entities (for example: resources, workflows, directory entries), triggering common actions (for example: create, archive, flag, handoff), and opening key tools or views.
- When adding new capabilities, always ask: what is the command-menu surface for this, and how would a power user invoke it without touching the mouse?
- Use backend capacity (for example: our KVM Hostinger environment) for indexing, precomputation, and caching so command menu and search feel extremely fast and reliable.

## Keyboard-accelerated workflows

- Ensure core flows are keyboard-accelerated even if most people click: focus behavior, tab order, and shortcuts should make experts feel faster, not get in the way.
- Maintain a small, coherent set of global shortcuts (for example: open command menu, navigate back, open help/shortcuts, submit feedback) and reuse patterns across the app.
- When introducing new shortcuts, keep them discoverable (for example: a shortcuts help view or contextual hints) and avoid one-off keybindings that break expectations.
- Treat keyboard accessibility as a baseline requirement: if something can be clicked, it should also be focusable and activatable via the keyboard.

## Performance and polish

- Treat perceived speed as a core product principle: interactions should feel smooth, responsive, and calm so coordinators trust the app in time-sensitive situations.
- Use server-side power deliberately: precompute, cache, and shape data on the backend so the UI can stay simple, fast, and focused on coordinator workflows.
- Favor clear, maintainable code with targeted optimizations in hot paths over clever but fragile micro-optimizations; optimize where it materially improves coordinator experience.
- Aim for a cohesive, finished feel: consistent loading, empty, error, and success states; thoughtful microcopy; and interactions that feel intentional rather than bolted on.

## Auditability and history

- All edits to canonical content should be attributable and reversible.
- Track creator and last editor on editable entities (for example: `created_at`, `created_by`, `updated_at`, `updated_by`).
- Prefer explicit versioning (for example: a `ResourceVersion` or equivalent) to capture snapshots of content over time, who changed it, and when.
- Avoid hard deletes for important content; prefer archival with clear audit trails.
- Where it adds value, provide UI to inspect history and restore prior versions to quickly recover from mistakes.

## PHI boundary

- This app is an operational layer, not an EMR.
- Do not store PHI (patient identifiers, contact info, clinical details) directly in this repo’s data models, configs, or logs.
- When integration is needed, use external IDs or references and keep PHI in the appropriate external systems.
