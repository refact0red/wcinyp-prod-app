# Untitled UI starter kit for Next.js

This is an official Untitled UI starter kit for Next.js. Kickstart your Untitled UI project with Next.js in seconds.

> [!NOTE]
> The “main” app has been moved to `refact0red/archive-untitled-wcinyp`. This repo now contains the `lab` app only at the repo root (no workspaces) and uses Bun for package management.

## Project context (WCINYP)

This repository is customized for Weill Cornell Imaging at New York Presbyterian (WCINYP). It powers an internal “supertool” for administrators to manage people across WCINYP—surfacing contact info, roles, and tags to keep teams aligned. Any copy or features should assume an internal admin audience rather than public-facing users.

## Untitled UI React

[Untitled UI React](https://www.untitledui.com/react) is the world’s largest collection of open-source React UI components. Everything you need to design and develop modern, beautiful interfaces—fast.

Built with React 19.1, Tailwind CSS v4.1, TypeScript 5.8, and React Aria, Untitled UI React components deliver modern performance, type safety, and maintainability.

[Learn more](https://www.untitledui.com/react) • [Documentation](https://www.untitledui.com/react/docs/introduction) • [Figma](https://www.untitledui.com/figma) • [FAQs](https://www.untitledui.com/faqs)

## Getting started

Install dependencies with Bun, then start the development server (Next runs on port 4000):

```bash
bun install
bun run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

> [!NOTE]
> TODO: npm installs currently fail because `cmdk@0.2.1` pegs `react@^18` while this repo is on React 19. We’re using Bun as the package manager, so a `.npmrc` with `legacy-peer-deps=true` isn’t in the repo. If npm workflows become necessary, either add that `.npmrc`, upgrade `cmdk` when it supports React 19, or align React down to 18.

## Drive data layer (Postgres + Drizzle)

- Docs: `docs/drive-data.md` (schema, migrations, seeds, commands)
- ADR: `docs/adr/0001-drive-data-layer.md`
- Key commands (npm):
  - `npm run db:up` / `npm run db:down`
  - `npm run db:migrate`
  - `npm run db:seed` (truncates and reloads Drive seeds)

## Resources

Untitled UI React is built on top of [Untitled UI Figma](https://www.untitledui.com/figma), the world's largest and most popular Figma UI kit and design system. Explore more:

**[Untitled UI Figma:](https://www.untitledui.com/react/resources/figma-files)** The world's largest Figma UI kit and design system.
<br/>
**[Untitled UI Icons:](https://www.untitledui.com/react/resources/icons)** A clean, consistent, and neutral icon library crafted specifically for modern UI design.
<br/>
**[Untitled UI file icons:](https://www.untitledui.com/react/resources/file-icons)** Free file format icons, designed specifically for modern web and UI design.
<br/>
**[Untitled UI flag icons:](https://www.untitledui.com/react/resources/flag-icons)** Free country flag icons, designed specifically for modern web and UI design.
<br/>
**[Untitled UI avatars:](https://www.untitledui.com/react/resources/avatars)** Free placeholder user avatars and profile pictures to use in your projects.
<br/>
**[Untitled UI logos:](https://www.untitledui.com/react/resources/logos)** Free fictional company logos to use in your projects.

## License

Untitled UI React open-source components are licensed under the MIT license, which means you can use them for free in unlimited commercial projects.

> [!NOTE]
> This license applies only to the starter kit and to the components included in this open-source repository. [Untitled UI React PRO](https://www.untitledui.com/react) includes hundreds more advanced UI components and page examples and is subject to a separate [license agreement](https://www.untitledui.com/license).

[Untitled UI license agreement →](https://www.untitledui.com/license)

[Frequently asked questions →](https://www.untitledui.com/faqs)
