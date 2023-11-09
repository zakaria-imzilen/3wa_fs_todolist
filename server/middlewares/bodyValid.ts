import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateIncData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next({
            status: 403,
            message: errors.array().map((err) => `${err.type}: ${err.msg}`),
        });
        return;
    }
    next();
};
