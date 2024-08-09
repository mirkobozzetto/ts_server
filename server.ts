import http from "http";
import url from "url";

const port = 3000;

interface RequestData {
	trimmedPath: string;
	queryStringObject: NodeJS.Dict<string | string[]>;
	method: string;
	headers: http.IncomingHttpHeaders;
	payload: string;
}

type Handler = (
	data: RequestData,
	callback: (statusCode: number, payload: object) => void
) => void;

interface Handlers {
	[key: string]: Handler | { [subKey: string]: Handler };
	notFound: Handler;
	home: Handler;
	data: Handler;
	_data: {
		get: Handler;
		post: Handler;
	};
}

const server: http.Server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
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
			});
	}
);
