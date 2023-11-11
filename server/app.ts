import express, { Application, NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import db from "./config/db";
import bodyParser from "body-parser";
import passport from "passport";
import authRouter from "./routes/auth";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import csurf from "csurf";

import TodoRouter from "./routes/todo";
import projectRouter from "./routes/projects";
import { generateProjects, generateTasks } from "./config/dummyDB";
import { UserObj } from "./interfaces";
import { activityLogger } from "./config/logger";

configDotenv();

const app: Application = express();
const PORT = Number(process.env.PORT);

db();
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET ?? "esdfnsdt345" }));

app.use(morgan("dev"));

// U want to send a POST Request, put it in the Header X-CSRF-TOKEN
// app.use(csurf({
//     cookie: {
//         key: '_csrf',
//         path: '/context-route',
//         httpOnly: true,
//         secure: false,
//         maxAge: 3600 // 1-hour
//     }
// }));

// PassportJS
app.use(passport.initialize());
import "./config/pass";

declare global {
    namespace Express {
        export interface Request {
            admin?: UserObj | any;
        }

        export interface User {
            _id: String;
            id: String;
            fullName: String;
            email: String;
            pwd: String;
        }
    }
}

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use((req, res, next) => {
    console.log("CSRF Header: ", req.headers);
    next();
});
// Generate a NEW CSRF Token and save it in a cookie
// app.use(csurf({ cookie: { httpOnly: true } }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use((req, res, next) => {
    console.log("Cookies: ", req.cookies);
    next();
});

app.use("/connect", (req, res, next) => {
    res
        // .cookie("X-CSRF-TOKEN", req.csrfToken(), { httpOnly: true })
        .send({ message: "Good" });
});

// Routes
app.use("/auth", authRouter);
app.use("/todos", TodoRouter);
app.use("/projects", projectRouter);

app.use((req, res, next) => {
    res.status(400).send({ message: "Bad Request" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
    console.log("Last error middleware", err);
    res
        .status(err.status ?? 500)
        .send({ message: err.message ?? "Something went wrong", ...err });
});

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
    // generateTasks(10).then((data) => { console.log("Generated") }).catch((err) => console.log(err));
});
