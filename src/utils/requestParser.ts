import http from "http";
import url from "url";
import { RequestData } from "../types";

/**
 * @param req
 * @param callback
 * @returns
 *
 * Parses the request and calls the callback with the parsed data.
 */
export const parseRequest = (
	req: http.IncomingMessage,
	callback: (data: RequestData) => void
): void => {
	const parsedUrl: url.UrlWithParsedQuery = url.parse(req.url || "", true);
	const path: string = parsedUrl.pathname || "";
	const trimmedPath: string = path.replace(/^\/+|\/+$/g, "");
	const method: string = req.method?.toLowerCase() || "get";
	const queryStringObject: NodeJS.Dict<string | string[]> = parsedUrl.query;
	const headers: http.IncomingHttpHeaders = req.headers;

	let body: Buffer[] = [];
	req
		.on("data", (chunk: Buffer) => {
			body.push(chunk);
		})
		.on("end", () => {
			const payload: string = Buffer.concat(body).toString();

			const data: RequestData = {
				trimmedPath,
				queryStringObject,
				method,
				headers,
				payload,
			};

			callback(data);
		});
};
