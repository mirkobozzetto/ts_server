import { DataHandlers, Handlers, RequestData } from "./types";

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
		console.log("Données reçues:", data.payload);
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
};
