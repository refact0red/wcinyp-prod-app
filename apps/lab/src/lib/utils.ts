import { cx } from "@/utils/cx";

export type ClassValue = Parameters<typeof cx>[number];

export function cn(...inputs: ClassValue[]) {
    return cx(...inputs);
}
