import { Router } from "express";
import passport from "passport";
import { getUserData, signin } from "../controllers/auth";
import jwt from "jsonwebtoken";
import { UserObj } from "../interfaces";
import { generateUsers } from "../config/dummyDB";
import User from "../models/User";
import { body } from "express-validator";
import { validateIncData } from "../middlewares/bodyValid";
import verify from "../middlewares/verify";

const authRouter = Router();


authRouter.get("/signin/failure", (req, res, next) =>
    next({ message: "Wrong credentials", status: 401 })
);

const validateEmail = body("email").isEmail().normalizeEmail();
// Authentication Local Strategy -- DB
// body: { email: "", pwd: "" }
// midd2: done(null, false)
// midd2: done(null, user)
authRouter.post(
    "/signin",
    validateEmail,
    validateIncData,
    passport.authenticate("local",
        { failureRedirect: "/auth/signin/failure" }
    ),
    // 👎🏻 Authentication Failure: Redirect to the route with the path "/auth/signin/failure", method: "GET"
    // 👍🏻 Authentication Success: next()
    signin
);


// Route: Authentication Auto
// Verify the token passed down and retrieve the user data in case of success
authRouter.get("/token", verify, getUserData);

// Dummy DB User
authRouter.get("/users-dummy/:num", (req, res, next) => {
    generateUsers(Number(req.params.num));

    User.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        next(err);
    })
});

export default authRouter;
