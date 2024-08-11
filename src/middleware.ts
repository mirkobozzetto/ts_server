import { Middleware, RequestData } from "./types";

export const applyMiddleware = (
	middlewares: Middleware[],
	data: RequestData
): Promise<void> => {
	return middlewares.reduce((promise, middleware) => {
		return promise.then(
			() =>
				new Promise<void>((resolve, reject) => {
					middleware(data, (error) => {
						if (error) reject(error);
						else resolve();
					});
				})
		);
	}, Promise.resolve());
};

export const loggingMiddleware: Middleware = (data, next) => {
	console.log(
		`[${new Date().toISOString()}] ${data.method.toUpperCase()} ${
			data.trimmedPath
		}`
	);
	next();
};

export const authMiddleware: Middleware = (data, next) => {
	const authToken = data.headers["authorization"];
	if (authToken === "secret-token") {
		next();
	} else {
		next(new Error("Unauthorized"));
	}
};
