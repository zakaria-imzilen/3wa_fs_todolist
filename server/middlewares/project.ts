import { NextFunction, Request, Response } from "express";
import Project from "../models/Project";
import { activityLogger } from "../config/logger";
import { MongooseError } from "mongoose";

export const checkAndSaveProjectData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { project_id } = req.params;

    try {
        const findingPrj = await Project.findById(project_id);
        if (!findingPrj) return next({ status: 404, message: "Project not found" });

        req.project = findingPrj;
        next();
    } catch (error) {
        activityLogger.error(error);

        if (error instanceof MongooseError) {
            return next({ status: 500, message: error.message });
        }
        console.error(
            "On looking for project using its id: " +
            project_id +
            " We got this error: ",
            error
        );
        return next({ status: 500, message: "Something went wrong" });
    }
};
