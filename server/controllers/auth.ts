import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import User from "../models/User";

export const signin = (req: Request, res: Response, next: NextFunction) => {
    console.log("User", req.user);
    if (req.user) {
        const generatedAccToken = sign(
            JSON.stringify(req.user),
            process.env.JWT_SECRET ?? "3i34tdfgjk345"
        ); // Generate a new JWT Token

        const generatedRefToken = sign(
            JSON.stringify(req.user),
            process.env.JWT_REF_SECRET ?? "238rbesf9832jk"
        );

        res
            .cookie("refreshToken", generatedRefToken, {
                httpOnly: false,
                // sameSite: "none",
                domain: "localhost",
                path: "/",

                // secure: false,
            })
            .cookie("accessToken", generatedAccToken, {
                httpOnly: false,
                // sameSite: "none",
                domain: "localhost",
                path: "/",

                // secure: false,
            })
            .status(200)
            .send({
                access_token: generatedAccToken,
                message: "Successfuly authenticated",
                user: req.user,
            });
        return;
    }
    return next({ status: 401, message: "Couldn't generate an access token" });
};

export const getUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    User.findById(req.admin._id)
        .then((data) => res.status(200).send(data))
        .catch((err) => next({ status: 500, ...err }));
};
