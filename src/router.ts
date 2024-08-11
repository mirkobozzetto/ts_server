import { handlers } from "./handlers";
import { authMiddleware, loggingMiddleware } from "./middleware";
import { RouteConfig } from "./types";

export const router: { [key: string]: RouteConfig } = {
	"": {
		handler: handlers.home,
		middlewares: [loggingMiddleware],
	},
	"api/data": {
		handler: handlers.data,
		middlewares: [loggingMiddleware, authMiddleware],
	},
	"api/topics": {
		handler: handlers.createTopic,
		middlewares: [loggingMiddleware, authMiddleware],
	},
	"api/phrases": {
		handler: handlers.addPhrase,
		middlewares: [loggingMiddleware, authMiddleware],
	},
	"api/topics/get": {
		handler: handlers.getTopic,
		middlewares: [loggingMiddleware],
	},
};
