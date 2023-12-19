import NotFound from "../components/NotFound";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import SignInSide from "../pages/SignIn";

export const publicRoutes = [
    {
        id: 1,
        path: "/",
        Component: Auth,
        children: [
            {
                id: "1",
                path: "/login",
                Component: SignInSide,
            },
            {
                id: 2,
                path: "/",
                Component: NotFound,
            },
        ],

    },
];

export const privateRoutes = [
    {
        id: 1,
        path: "/home",
        component: Home,
    },
    {
        id: 2,
        path: "*",
        Component: NotFound,
    },
];
