"use client";

import { Edit2Icon, PlusIcon, Search } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import type { WcinypRadiologistSpecialty } from "@/lib/wcinyp/radiologists";

type DirectoryRadiologistsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  specialties: WcinypRadiologistSpecialty[];
  selectedSpecialty?: WcinypRadiologistSpecialty;
  onSpecialtyChange: (value?: WcinypRadiologistSpecialty) => void;
  onAddRadiologist?: () => void;
  onEditRadiologist?: () => void;
  canEditRadiologist?: boolean;
};

export function DirectoryRadiologistsToolbar({
  search,
  onSearchChange,
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
  onAddRadiologist,
  onEditRadiologist,
  canEditRadiologist,
}: DirectoryRadiologistsToolbarProps) {
  return (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by name or specialty"
              className="h-8 w-full pl-9 text-sm"
            />
          </div>

          {specialties.length > 0 ? (
            <div className="flex items-center gap-2 border-l border-border/80 pl-3 text-xs">
              <span className="font-medium text-muted-foreground">Specialty</span>
              <Select
                value={selectedSpecialty ?? "all"}
                onValueChange={(value) => {
                  onSpecialtyChange(
                    value === "all" ? undefined : (value as WcinypRadiologistSpecialty)
                  );
                }}
              >
                <SelectTrigger size="sm" className="min-w-[11rem] bg-background">
                  <SelectValue placeholder="All specialties" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all">All specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>

        {(onAddRadiologist || onEditRadiologist) && (
          <div className="flex items-center gap-2">
            {onEditRadiologist && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-2 px-3 text-sm"
                type="button"
                onClick={onEditRadiologist}
                disabled={!canEditRadiologist}
              >
                <Edit2Icon className="size-3.5" />
                <span>Edit</span>
              </Button>
            )}
            {onAddRadiologist && (
              <Button
                size="sm"
                className="h-8 gap-2 px-3 text-sm"
                type="button"
                onClick={onAddRadiologist}
              >
                <PlusIcon className="size-3.5" />
                <span>Add</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
