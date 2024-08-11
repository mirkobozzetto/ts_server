import http from "http";
import url from "url";

const port: number = 3000;

/**
 * Data structure for the request data
 */
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

/**
 * Data structure for the handlers
 */
interface Handlers {
	[key: string]: Handler;
	notFound: Handler;
	home: Handler;
	data: Handler;
}

interface DataHandlers {
	get: Handler;
	post: Handler;
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

				const chosenHandler: Handler =
					typeof router[trimmedPath] !== "undefined"
						? router[trimmedPath]
						: handlers.notFound;

				const data: RequestData = {
					trimmedPath,
					queryStringObject,
					method,
					headers,
					payload,
				};

				chosenHandler(data, (statusCode: number, payload: object) => {
					const payloadString: string = JSON.stringify(payload);

					res.setHeader("Content-Type", "application/json");
					res.writeHead(statusCode);
					res.end(payloadString);

					console.log(`Réponse: ${statusCode} ${payloadString}`);
				});
			});
	}
);

server.listen(port, () => {
	console.log(`Serveur en écoute sur http://localhost:${port}`);
});

const dataHandlers: DataHandlers = {
	get: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		callback(200, { message: "Voici quelques données du serveur" });
	},

	post: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		console.log("Données reçues:", data.payload);
		callback(201, { message: "Données reçues avec succès" });
	},
};

const handlers: Handlers = {
	home: (
		data: RequestData,
		callback: (statusCode: number, payload: object) => void
	) => {
		callback(200, { message: "Bienvenue sur notre serveur backend!" });
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

const router: { [key: string]: Handler } = {
	"": handlers.home,
	"api/data": handlers.data,
};
