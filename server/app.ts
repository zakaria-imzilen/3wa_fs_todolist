import express, { Application, NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import db from "./config/db";
import csurf from "csurf"
import bodyParser from "body-parser";
import passport from "passport";
import authRouter from "./routes/auth";
import session from "express-session";
import cors from "cors"
import cookieParser from "cookie-parser";

configDotenv();


const app: Application = express();
const PORT = process.env.PORT;

db();
app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_SECRET ?? "esdfnsdt345" }))

// U want to send a POST Request, put it in the Header X-CSRF-TOKEN
// app.use((req, res, next) => {
//     console.log(req.cookies);
//     console.log(req.body);
//     console.log(req.headers)
// }, csurf({ cookie: false }));

// PassportJS
app.use(passport.initialize());
import "./config/pass"
import TodoRouter from "./routes/todo";
import { UserObj } from "./interfaces";

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({ origin: '*' }));

// app.use((req, res, next) => {
//     // If the client does not have a CSRF token cookie, generate one and set it.
//     if (!req.cookies['X-CSRF-Token']) {
//         res.cookie('X-CSRF-Token', req.csrfToken(), {
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60 * 24, // 1 day
//         });
//     }

//     next();
// });

// Test 
// Generate a new CSRF token and return it to the client.
// app.get('/api/csrf-token', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
// });

// Generate a NEW CSRF Token and save it in a cookie


// Routes
app.use("/auth", authRouter);
app.use("/todos", TodoRouter)

app.use((req, res, next) => {
    res.status(400).send({ message: "Bad Request" });
})

app.use(
    (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): any => {
        console.log(err)
        if (err instanceof Error) {
            res.status(400).send(err);
            return;
        } else {
            res.status(err.status ?? 400).send(err);
            return;
        }
    }
);

app.listen(PORT, () => console.log("Server listening on port: ", PORT));
