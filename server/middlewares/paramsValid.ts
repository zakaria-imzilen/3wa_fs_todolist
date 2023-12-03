import { NextFunction, Request, Response } from "express";
import { param, validationResult } from "express-validator";

export const expressValidTodoIdMidd = param("todo_id").isMongoId();
export const expressValidPrjIdMidd = param("project_id").isMongoId();

export const validateParam = (req: Request, res: Response, next: NextFunction) => {
    const { isEmpty, array } = validationResult(req);

    if (!isEmpty) return next({ status: 422, message: array().join(" ") });
    next();
}