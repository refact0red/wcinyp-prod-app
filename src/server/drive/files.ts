import { sql } from "drizzle-orm";

import { getFilesByMode } from "@/app/drive/data";
import type { DriveFile, DriveMode } from "@/app/drive/data";
import { db } from "@/server/db/client";
import { files } from "@/server/db/schema";

function mapRowToDriveFile(row: typeof files.$inferSelect): DriveFile {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    status: row.status,
    updated: row.updatedAt.toISOString(),
    size: row.sizeLabel,
    href: row.href,
    collections: row.collections,
    mimeType: row.mimeType,
  };
}

export async function fetchDriveFilesByMode(mode: DriveMode): Promise<DriveFile[]> {
  try {
    const query = db.select().from(files);
    const rows =
      mode === "all"
        ? await query
        : await query.where(sql`${mode} = ANY(${files.collections})`);
    if (rows.length > 0) {
      return rows.map(mapRowToDriveFile);
    }
  } catch (error) {
    console.warn("[drive] falling back to seed data", error);
  }

  // Fallback to seed data if DB is not ready
  return getFilesByMode(mode);
}
