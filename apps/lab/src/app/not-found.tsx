"use client";

import { ArrowLeft, ArrowRight, BookOpen01, CodeSquare02, MessageChatCircle, SearchLg, Zap } from "@untitledui/icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <section className="flex min-h-screen items-center justify-center bg-primary px-4 py-16 text-primary-foreground md:px-8 md:py-24">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 text-center">
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

                    <div className="flex w-full flex-col-reverse items-center justify-center gap-3 sm:flex-row sm:justify-center">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 size-4" />
                            Go back
                        </Button>
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                            <a href="/">
                                Take me home
                                <ArrowRight className="ml-2 size-4" />
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="w-full max-w-3xl">
                    <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">Helpful links</p>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[
                            {
                                title: "Documentation",
                                subtitle: "Dive in to learn all about our product.",
                                icon: CodeSquare02,
                                cta: "Start learning",
                                href: "#",
                            },
                            {
                                title: "Our blog",
                                subtitle: "Read the latest posts on our blog.",
                                icon: BookOpen01,
                                cta: "View latest posts",
                                href: "#",
                            },
                            {
                                title: "Chat to us",
                                subtitle: "Can&apos;t find what you&apos;re looking for?",
                                icon: MessageChatCircle,
                                cta: "Chat to our team",
                                href: "#",
                            },
                            {
                                title: "Product updates",
                                subtitle: "See what&apos;s new and improved.",
                                icon: Zap,
                                cta: "View updates",
                                href: "#",
                            },
                        ].map((item) => (
                            <li
                                key={item.title}
                                className="flex items-start gap-4 rounded-xl bg-background/80 p-4 text-left shadow-sm"
                            >
                                <div className="mt-1 flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <item.icon className="size-4" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                                    <Button variant="link" size="sm" className="px-0" asChild>
                                        <a href={item.href} className="inline-flex items-center gap-1">
                                            <span>{item.cta}</span>
                                            <ArrowRight className="size-4" />
                                        </a>
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

