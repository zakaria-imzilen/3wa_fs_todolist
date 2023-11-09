import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    // Authorization
    // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NTQwZGM4ZGJlYmMyNjI3N2VhYWQ4NmQiLCJpZCI6IndramVucmUiLCJmdWxsTmFtZSI6Ilpha2FyaWEgSW16aWxlbiIsImVtYWlsIjoiemFrYXJpYUBnbWFpbC5jb20iLCJwd2QiOiJ6YWthcmlhcHdkIn0.GBbpPoNoL_UjJY84ct2_F9UZ-eRnm8j7pAcYDYphiRU"

    if (!token) return next({ status: 401, message: "Invalid JWT token" });

    try {
        const decodedData = verify(
            token,
            process.env.JWT_SECRET ?? "3i34tdfgjk345"
        );
        // If the verification 👆🏻 doesn't go well, JWT throws an error
        // Which catch handles it down 👇🏻

        req.admin = decodedData;

        next();
    } catch (error) {
        console.log(token, error)

        next({ status: 401, message: "Expired JWT token" });
    }
};
