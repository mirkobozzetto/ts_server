import pool from "./db";

export const createTopic = async (name: string) => {
	const result = await pool.query(
		"INSERT INTO topics(name) VALUES($1) RETURNING *",
		[name]
	);
	return result.rows[0];
};

export const addPhrase = async (topicId: number, phrase: string) => {
	const result = await pool.query(
		"INSERT INTO phrases(topic_id, content) VALUES($1, $2) RETURNING *",
		[topicId, phrase]
	);
	return result.rows[0];
};

export const getTopicWithPhrases = async (topicId: number) => {
	const result = await pool.query(
		"SELECT t.id, t.name, json_agg(p.content) as phrases FROM topics t LEFT JOIN phrases p ON t.id = p.topic_id WHERE t.id = $1 GROUP BY t.id",
		[topicId]
	);
	return result.rows[0];
};
