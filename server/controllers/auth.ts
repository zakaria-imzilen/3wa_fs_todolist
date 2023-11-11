import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import User from "../models/User";

export const signin = (req: Request, res: Response, next: NextFunction) => {
    console.log("User", req.user);
    if (req.user) {
        if (process.env.JWT_SECRET && process.env.JWT_REF_SECRET) {
            const generatedAccToken = sign(
                { ...req.user },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            ); // Generate a new Access Token -- expires in 2 hours

            const generatedRefToken = sign(
                { ...req.user },
                process.env.JWT_REF_SECRET,
                { expiresIn: "2d" }
            ); // Generate a new Refresh Token -- expires in 2 days

            res
                .cookie("refreshToken", generatedRefToken, {
                    // path: '/',
                    // secure: true,
                    httpOnly: true,
                    // sameSite: 'none',
                })
                .cookie("accessToken", generatedAccToken, {
                    // path: '/',
                    // secure: true,
                    httpOnly: true,
                    // sameSite: 'none',
                })
                .status(200)
                .send({
                    access_token: generatedAccToken,
                    refresh_token: generatedRefToken,
                    message: "Successfuly authenticated",
                    user: req.user,
                });
            return;
        } else {
            console.log("Couldn't generate an access token");
            return next({
                status: 401,
                message: "Couldn't generate an access token",
            });
        }
    }
    return next({ status: 401, message: "Couldn't generate an access token" });
};

export const getUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    User.findById(req.admin._id, "-pwd")
        .then((data) => res.status(200).send(data))
        .catch((err) => next({ status: 500, ...err }));
};
