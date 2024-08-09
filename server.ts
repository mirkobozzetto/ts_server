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
	}
);
