import Auth from "./pages/Auth";
import Home from "./pages/Home";

export const routes = [
	{
		id: 1,
		path: "/",
		component: Auth,
	},
	{
		id: 2,
		path: "/home",
		component: Home,
	},
];
