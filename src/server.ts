import http from "http";
import { port } from "./config";
import { handlers } from "./handlers";
import { router } from "./router";
import { Handler } from "./types";
import { parseRequest } from "./utils/requestParser";

const server: http.Server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		parseRequest(req, (data) => {
			const chosenHandler: Handler =
				typeof router[data.trimmedPath] !== "undefined"
					? router[data.trimmedPath]
					: handlers.notFound;

			chosenHandler(data, (statusCode: number, payload: object) => {
				const payloadString: string = JSON.stringify(payload);

				res.setHeader("Content-Type", "application/json");
				res.writeHead(statusCode);
				res.end(payloadString);

				console.log(`Response: ${statusCode} ${payloadString}`);
			});
		});
	}
);

server.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
