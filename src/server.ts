import http from "http";
import { port } from "./config";
import { handlers } from "./handlers";
import { applyMiddleware } from "./middleware";
import { router } from "./router";
import { RequestData, RouteConfig } from "./types";
import { parseRequest } from "./utils/requestParser";

const server: http.Server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		parseRequest(req, (data: RequestData) => {
			const routeConfig: RouteConfig = router[data.trimmedPath] || {
				handler: handlers.notFound,
			};
			const { handler, middlewares = [] } = routeConfig;

			applyMiddleware(middlewares, data)
				.then(() => {
					handler(data, (statusCode: number, payload: object) => {
						const payloadString: string = JSON.stringify(payload);

						res.setHeader("Content-Type", "application/json");
						res.writeHead(statusCode);
						res.end(payloadString);

						console.log(`Response: ${statusCode} ${payloadString}`);
					});
				})
				.catch((error: Error) => {
					res.writeHead(401);
					res.end(JSON.stringify({ error: error.message }));
				});
		});
	}
);

server.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
