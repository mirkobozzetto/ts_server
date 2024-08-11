import { handlers } from "./handlers";
import { Handler } from "./types";

export const router: { [key: string]: Handler } = {
	"": handlers.home,
	"api/data": handlers.data,
};
