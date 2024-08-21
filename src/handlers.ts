import { addPhrase, createTopic, getTopicWithPhrases } from "./dbOperations";
import { Handler, Handlers, RequestData } from "./types";

export interface DataHandlers {
	get: Handler;
	post: Handler;
}

const dataHandlers: DataHandlers = {
	get: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		callback(200, { message: "There are some data" });
	},
	post: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		console.log("Data received:", data.payload);
		callback(201, { message: "Data received successfully" });
	},
};

export const handlers: Handlers = {
	home: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		callback(200, { message: "Welcome everybody !" });
	},
	data: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		const acceptableMethods: string[] = ["get", "post"];
		if (
			acceptableMethods.includes(data.method) &&
			data.method in dataHandlers
		) {
			dataHandlers[data.method as keyof DataHandlers](data, callback);
		} else {
			callback(405, {});
		}
	},
	notFound: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		callback(404, {});
	},

	createTopic: async (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		try {
			const { name } = JSON.parse(data.payload);
			const topic = await createTopic(name);
			callback(201, { message: "Topic created successfully", topic });
		} catch (error) {
			callback(500, { error: "Failed to create topic" });
		}
	},

	addPhrase: async (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		try {
			const { topicId, phrase } = JSON.parse(data.payload);
			const newPhrase = await addPhrase(topicId, phrase);
			callback(201, {
				message: "Phrase added successfully",
				phrase: newPhrase,
			});
		} catch (error) {
			callback(500, { error: "Failed to add phrase" });
		}
	},

	getTopic: async (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		try {
			const topicId = parseInt(data.queryStringObject.id as string);
			const topic = await getTopicWithPhrases(topicId);
			if (topic) {
				callback(200, topic);
			} else {
				callback(404, { error: "Topic not found" });
			}
		} catch (error) {
			callback(500, { error: "Failed to get topic" });
		}
	},
};
