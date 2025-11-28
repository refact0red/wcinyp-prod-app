"use client";

import { Button } from "@/components/shadcn/ui/button";

type Vars = React.CSSProperties;

const neutralVars: Vars = {
  // Neutral preset from shadcn docs (current app tokens).
  "--background": "oklch(1 0 0)",
  "--foreground": "oklch(0.145 0 0)",
  "--accent": "oklch(0.97 0 0)",
  "--accent-foreground": "oklch(0.205 0 0)",
  "--border": "oklch(0.922 0 0)",
  "--input": "oklch(0.922 0 0)",
  "--ring": "oklch(0.708 0 0)",
} as Vars;

const grayVars: Vars = {
  // Gray preset from shadcn themes (closer to what the New York demo uses).
  "--background": "oklch(1 0 0)",
  "--foreground": "oklch(0.13 0.028 261.692)",
  "--accent": "oklch(0.967 0.003 264.542)",
  "--accent-foreground": "oklch(0.21 0.034 264.665)",
  "--border": "oklch(0.928 0.006 264.531)",
  "--input": "oklch(0.928 0.006 264.531)",
  "--ring": "oklch(0.707 0.022 261.325)",
} as Vars;

export default function ButtonComparePage() {
  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">Button appearance comparison</h1>
          <p className="text-sm text-muted-foreground">
            Side-by-side comparison of the outline Button using our current (neutral) tokens vs the shadcn Gray preset.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section
            className="rounded-lg border p-6 shadow-sm"
            style={{
              ...neutralVars,
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <div className="mb-4 text-sm font-semibold text-[color:var(--foreground)]">
              Current app tokens (Neutral)
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">Button</Button>
              <Button variant="outline" size="icon" aria-label="Submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up"
                  aria-hidden="true"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </Button>
            </div>
          </section>

          <section
            className="rounded-lg border p-6 shadow-sm"
            style={{
              ...grayVars,
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <div className="mb-4 text-sm font-semibold text-[color:var(--foreground)]">
              Shadcn “Gray” preset (docs-style)
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">Button</Button>
              <Button variant="outline" size="icon" aria-label="Submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up"
                  aria-hidden="true"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
