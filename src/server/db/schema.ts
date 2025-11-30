import { sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const driveItemTypeEnum = pgEnum("drive_item_type", [
  "Document",
  "Presentation",
  "Spreadsheet",
  "Image",
  "Folder",
]);

export const driveItemStatusEnum = pgEnum("drive_item_status", [
  "Synced",
  "In Review",
  "Draft",
]);

export const driveCollectionEnum = pgEnum("drive_collection", [
  "documents",
  "packets",
  "automations",
  "public",
]);

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: driveItemTypeEnum("type").notNull(),
  status: driveItemStatusEnum("status").notNull(),
  collections: driveCollectionEnum("collections")
    .array()
    .notNull()
    .default(sql`'{}'::drive_collection[]`),
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  sizeLabel: text("size_label").notNull(),
  sizeBytes: integer("size_bytes"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  href: text("href").notNull(),
  externalLink: text("external_link"),
  mimeType: text("mime_type").notNull().default("application/pdf"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAtDb: timestamp("updated_at_db", { withTimezone: true }).notNull().defaultNow(),
});

export const packets = pgTable("packets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const packetItems = pgTable(
  "packet_items",
  {
    packetId: uuid("packet_id")
      .references(() => packets.id, { onDelete: "cascade" })
      .notNull(),
    fileId: uuid("file_id")
      .references(() => files.id, { onDelete: "cascade" })
      .notNull(),
    required: boolean("required").notNull().default(true),
    notes: text("notes"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.packetId, table.fileId] }),
  })
);

export const automations = pgTable("automations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status"),
  workflowRef: text("workflow_ref"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type FileRow = typeof files.$inferSelect;
