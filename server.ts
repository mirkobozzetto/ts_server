import http from "http";

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
