import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const checkingRefToken = (
    req: Request,
    res: Response,
    next: NextFunction,
    refreshToken: string
) => {
    console.log("I can't see the Access token\nOnly the refresh token")

    try {
        const decodedData = verify(
            refreshToken,
            process.env.JWT_REF_SECRET ?? "238rbesf9832jk"
        );
        // If the verification 👆🏻 doesn't go well, JWT throws an error
        // Which catch handles it down 👇🏻
        if (process.env.JWT_SECRET) {
            const generatedAccToken = sign(decodedData, process.env.JWT_SECRET,)

            req.cookies.accessToken = generatedAccToken;
            res.cookie("accessToken", generatedAccToken, {
                secure: false,
                httpOnly: false,
                domain: "localhost"
            });
        } else {
            console.log("Couldn't access to the JWT Secret key");
            return next({ status: 500, message: "Access token unreachable and we couldn't refresh it" })
        }

        req.admin = decodedData;

        return next();
    } catch (error) {
        console.log("Couldn't refresh the JWT token", refreshToken);
        return next({ status: 422, message: "Refresh token" })
    }


};

export default (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Cookies -- ", req.cookies);
    const token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    console.log("Acc Token: ", token);
    console.log("Ref Token: ", refreshToken);
    // Authorization
    // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NTQwZGM4ZGJlYmMyNjI3N2VhYWQ4NmQiLCJpZCI6IndramVucmUiLCJmdWxsTmFtZSI6Ilpha2FyaWEgSW16aWxlbiIsImVtYWlsIjoiemFrYXJpYUBnbWFpbC5jb20iLCJwd2QiOiJ6YWthcmlhcHdkIn0.GBbpPoNoL_UjJY84ct2_F9UZ-eRnm8j7pAcYDYphiRU"

    if (!token && !refreshToken)
        return next({ status: 401, message: "No Access token has been provided!" }); // --> Error Middleware

    try {
        if (token) {
            const decodedData = verify(
                token,
                process.env.JWT_SECRET ?? "3i34tdfgjk345"
            ) as JwtPayload;
            // If the verification 👆🏻 doesn't go well, JWT throws an error
            // Which catch handles it down 👇🏻
            console.log("Decoded Token", decodedData)
            req.admin = decodedData?._doc;

            return next();
        }

        // His access token may be expired
        // Refresh it 3la llah 🙏🏻
        if (refreshToken) {
            checkingRefToken(req, res, next, refreshToken);
        }
    } catch (error) {
        console.log(token, error);

        // His access token may be expired
        // Refresh it 3la llah 🙏🏻
        if (refreshToken) {
            return checkingRefToken(req, res, next, refreshToken);
        }

        next({ status: 401, message: "Expired JWT token" });
    }
};
