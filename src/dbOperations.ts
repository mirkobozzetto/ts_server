import { db } from "./db";
import { topics, phrases } from "./db/schema";
import { eq } from "drizzle-orm";

export const createTopic = async (name: string) => {
	const [result] = await db.insert(topics).values({ name }).returning();
	return result;
};

export const addPhrase = async (topicId: number, content: string) => {
	const [result] = await db
		.insert(phrases)
		.values({ topicId, content })
		.returning();
	return result;
};

export const getTopicWithPhrases = async (topicId: number) => {
	const result = await db
		.select({
			id: topics.id,
			name: topics.name,
			phrases: phrases.content,
		})
		.from(topics)
		.leftJoin(phrases, eq(topics.id, phrases.topicId))
		.where(eq(topics.id, topicId))
		.execute();

	// Group phrases
	const groupedResult = result.reduce((acc, row) => {
		if (!acc.id) {
			acc.id = row.id;
			acc.name = row.name;
			acc.phrases = [];
		}
		if (row.phrases) acc.phrases.push(row.phrases);
		return acc;
	}, {} as { id: number; name: string; phrases: string[] });

	return groupedResult;
};
