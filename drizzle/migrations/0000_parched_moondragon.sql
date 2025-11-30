CREATE EXTENSION IF NOT EXISTS "pgcrypto";--> statement-breakpoint
CREATE TYPE "public"."drive_collection" AS ENUM('documents', 'packets', 'automations', 'public');--> statement-breakpoint
CREATE TYPE "public"."drive_item_status" AS ENUM('Synced', 'In Review', 'Draft');--> statement-breakpoint
CREATE TYPE "public"."drive_item_type" AS ENUM('Document', 'Presentation', 'Spreadsheet', 'Image', 'Folder');--> statement-breakpoint
CREATE TABLE "automations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text,
	"workflow_ref" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "drive_item_type" NOT NULL,
	"status" "drive_item_status" NOT NULL,
	"collections" "drive_collection"[] DEFAULT '{}'::drive_collection[] NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"size_label" text NOT NULL,
	"size_bytes" integer,
	"updated_at" timestamp with time zone NOT NULL,
	"href" text NOT NULL,
	"external_link" text,
	"mime_type" text DEFAULT 'application/pdf' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at_db" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packet_items" (
	"packet_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	"required" boolean DEFAULT true NOT NULL,
	"notes" text,
	CONSTRAINT "packet_items_packet_id_file_id_pk" PRIMARY KEY("packet_id","file_id")
);
--> statement-breakpoint
CREATE TABLE "packets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "packet_items" ADD CONSTRAINT "packet_items_packet_id_packets_id_fk" FOREIGN KEY ("packet_id") REFERENCES "public"."packets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packet_items" ADD CONSTRAINT "packet_items_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
