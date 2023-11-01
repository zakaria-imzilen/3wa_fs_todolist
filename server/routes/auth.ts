import { Router } from "express";
import passport from "passport";
import { signin } from "../controllers/auth";
import jwt from "jsonwebtoken"


const authRouter = Router();

// Authentication Local Strategy -- DB
// body: { email: "", pwd: "" }
// midd2: done(null, false)
// midd2: done(null, user)
authRouter.post("/signin", passport.authenticate("local"), signin);

// Route: Authentication Auto
authRouter.get("/token", (req, res, next) => {
    // 1- Retrieve the access token from the header Authorization
    const token = req.headers.authorization?.split(" ")[1]; // => ["Bearer", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9."]

    if (!token) {
        return res.status(401).json({ message: "Missing Authorization header" });
    }

    const decodedData = jwt.verify(token, "3i34tdfgjk345");

    if (!decodedData) {
        return res.status(401).json({ message: "Expired Token" });
    }

    res.status(200).json({ message: "Successfuly authenticated", data: decodedData });
});

export default authRouter