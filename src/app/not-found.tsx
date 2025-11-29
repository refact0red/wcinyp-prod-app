"use client";

import { ArrowLeft, SearchLg } from "@untitledui/icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";

// TODO: Align this 404 page with the main app’s not-found design once Labs has a dedicated home/landing experience.

export default function NotFound() {
    const router = useRouter();

    return (
        <section className="flex min-h-screen items-center justify-center bg-primary px-4 py-16 text-primary-foreground md:px-8 md:py-24">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-lg">
                        <SearchLg className="size-8" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">Page not found</h1>
                        <p className="text-balance text-base text-muted-foreground md:text-lg">
                            The page you are looking for doesn&apos;t exist or may have been moved.
                        </p>
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full max-w-xs"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 size-4" />
                            Go back
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
