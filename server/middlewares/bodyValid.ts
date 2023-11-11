import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { activityLogger } from "../config/logger";

export const validateIncData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        activityLogger.error("Invalid incoming data: " + JSON.stringify(errors.array()));
        next({
            status: 422,
            message: errors.array().map((err) => `${err.type}: ${err.msg}`),
        });
        return;
    }
    next();
};
