import http from "http";
import { topics, phrases } from "./db/schema";

export type Topic = typeof topics.$inferSelect;
export type Phrase = typeof phrases.$inferSelect;

export interface RequestData {
	trimmedPath: string;
	queryStringObject: NodeJS.Dict<string | string[]>;
	method: string;
	headers: http.IncomingHttpHeaders;
	payload: string;
}

export type Handler = (
	data: RequestData,
	callback: (statusCode: number, payload: object) => void
) => void;

export type Middleware = (
	data: RequestData,
	next: (error?: Error) => void
) => void;

export interface RouteConfig {
	handler: Handler;
	middlewares?: Middleware[];
}

export interface Handlers {
	[key: string]: Handler;
	notFound: Handler;
	home: Handler;
	data: Handler;
}

export interface DataHandlers {
	get: Handler;
	post: Handler;
}
