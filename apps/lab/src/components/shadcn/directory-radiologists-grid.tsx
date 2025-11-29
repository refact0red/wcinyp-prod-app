"use client";

import Image from "next/image";

import type { WcinypRadiologist } from "@/lib/wcinyp/radiologists";
import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";

export type DirectoryRadiologistsGridProps = {
  radiologists: WcinypRadiologist[];
  emptyMessage?: string;
  selectedRadiologistId?: string | null;
  onSelectRadiologist?: (id: string) => void;
};

const PLACEHOLDER_SRC = "/images/radiologists/placeholder.jpg";

const getRadiologistImageSrc = (rad: WcinypRadiologist) => {
  if (!rad.headshot?.src || rad.hasHeadshot === false) {
    return PLACEHOLDER_SRC;
  }

  return rad.headshot.src;
};

export function DirectoryRadiologistsGrid({
  radiologists,
  emptyMessage,
  selectedRadiologistId,
  onSelectRadiologist,
}: DirectoryRadiologistsGridProps) {
  if (!radiologists.length) {
    return (
      <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
        {emptyMessage ?? "No radiologists available yet."}
      </div>
    );
  }

  const sortedRadiologists = [...radiologists].sort((a, b) => {
    const getKey = (rad: WcinypRadiologist) => {
      const beforeComma = rad.name.split(",")[0] ?? rad.name;
      const parts = beforeComma.trim().split(/\s+/);
      const lastName = parts[parts.length - 1]?.toLowerCase() ?? "";
      return `${lastName} ${beforeComma.toLowerCase()}`;
    };

    const aKey = getKey(a);
    const bKey = getKey(b);

    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });

  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {sortedRadiologists.map((rad) => {
        const isSelected = selectedRadiologistId === rad.id;

        const handleSelect = () => {
          if (onSelectRadiologist) {
            onSelectRadiologist(rad.id);
          }
        };

        const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect();
          }
        };

        return (
          <Card
            key={rad.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            className={cn(
              "group h-full cursor-pointer overflow-hidden border border-border/40 p-0 transition",
              "hover:border-border hover:shadow-sm",
              isSelected && "border-primary/60 ring-1 ring-primary/40"
            )}
          >
            <AspectRatio ratio={3 / 4} className="bg-muted">
              <Image
                src={getRadiologistImageSrc(rad)}
                alt={rad.headshot.alt}
                fill
                sizes="(min-width: 1280px) 200px, (min-width: 1024px) 180px, (min-width: 768px) 160px, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </AspectRatio>
            <CardHeader className="px-3 py-4">
              <CardTitle className="text-sm leading-snug whitespace-nowrap">
                {rad.name}
              </CardTitle>
              <CardDescription className="mt-0.5 text-sm leading-snug">
                {rad.specialties.join(", ")}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
