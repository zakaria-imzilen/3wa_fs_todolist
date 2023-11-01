import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const signin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated())
        return next({ message: "Wrong credentials", status: 401 });

    console.log("User", req.user);
    const generatedToken = sign(
        JSON.stringify(req.user),
        process.env.JWT_SECRET ?? "3i34tdfgjk345"
    ); // Generate a new JWT Token

    res
        .status(200)
        .send({
            access_token: generatedToken,
            message: "Successfuly authenticated",
        });
};
