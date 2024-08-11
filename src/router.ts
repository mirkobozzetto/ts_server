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
};
