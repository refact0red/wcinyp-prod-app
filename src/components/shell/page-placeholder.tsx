export function PagePlaceholder({ title }: { title: string }) {
    return (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-sm text-muted-foreground">
            {title} content coming soon.
        </div>
    );
}
