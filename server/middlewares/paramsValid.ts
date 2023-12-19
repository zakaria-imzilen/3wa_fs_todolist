import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const expressValidTodoIdMidd = param("todo_id").isMongoId();
export const expressValidPrjIdMidd = [
    param("project_id").isMongoId(),
    body("label").notEmpty().withMessage("Label shouldn't be empty"),
    body("user").isMongoId().withMessage("User id's not valid"),
    body("status")
        .isIn(["TODO", "WIP", "DONE"])
        .withMessage("User id's not valid"),
];

export const validateParam = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { isEmpty, array } = validationResult(req);

    if (!isEmpty) return next({ status: 422, message: array().join(" ") });
    next();
};
