import "dotenv/config";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";

import { automationSeeds, driveItems, packetSeeds } from "@/app/drive/data";
import { db } from "@/server/db/client";
import { files } from "@/server/db/schema";

async function seedFiles() {
  const fileRows = [
    ...driveItems.map((item) => ({
      id: randomUUID(),
      name: item.name,
      type: item.type,
      status: item.status,
      collections: ["documents"],
      tags: [] as string[],
      sizeLabel: item.size,
      sizeBytes: null as number | null,
      updatedAt: new Date(item.updated),
      href: item.href,
      externalLink: null as string | null,
      mimeType: "application/pdf",
    })),
    ...packetSeeds.map((item) => ({
      id: randomUUID(),
      name: item.name,
      type: item.type,
      status: item.status,
      collections: item.collections,
      tags: [] as string[],
      sizeLabel: item.size,
      sizeBytes: null as number | null,
      updatedAt: new Date(item.updated),
      href: item.href,
      externalLink: null as string | null,
      mimeType: item.mimeType,
    })),
    ...automationSeeds.map((item) => ({
      id: randomUUID(),
      name: item.name,
      type: item.type,
      status: item.status,
      collections: item.collections,
      tags: [] as string[],
      sizeLabel: item.size,
      sizeBytes: null as number | null,
      updatedAt: new Date(item.updated),
      href: item.href,
      externalLink: null as string | null,
      mimeType: item.mimeType,
    })),
  ];

  if (!fileRows.length) return;

  await db.execute(sql`TRUNCATE TABLE files CASCADE`);
  await db.insert(files).values(fileRows);
}

async function main() {
  await seedFiles();
  console.log("Seed complete");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
