import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const topics = pgTable("topics", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});

export const phrases = pgTable("phrases", {
	id: serial("id").primaryKey(),
	topicId: integer("topic_id").references(() => topics.id),
	content: text("content").notNull(),
});
