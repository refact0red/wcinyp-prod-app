import { notFound } from "next/navigation";
import { TeamPageClient } from "./team-page-client";

const allowedSlugs = new Set(["sprl", "e61", "wgc"]);

type TeamPageProps = {
    params: { team: string };
};

export default function TeamPage({ params }: TeamPageProps) {
    const slug = params.team.toLowerCase();

    if (!allowedSlugs.has(slug)) {
        notFound();
    }

    return <TeamPageClient teamSlug={slug} />;
}
