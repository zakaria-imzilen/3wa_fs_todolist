import { NextFunction, Request, Response } from "express";
import Project from "../models/Project";

export const getProjects = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const adminId = req.admin?._id;

    if (!adminId)
        return next({
            status: 401,
            message: "Admin id not provided in the params",
        });

    Project.find({ creator: adminId })
        .select("_id title")
        // .populate("creator")
        // .populate("contributors")
        // .populate({
        //     path: "todos",
        //     populate: {
        //         path: "user"
        //     }
        // })
        .then((projects) =>
            res.send({ message: "Successfuly projects fetched", data: projects })
        )
        .catch((err) => {
            next(err);
        });
};

export const getProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.project_id;

    console.log("Projects - Tokens: ", req.cookies)

    Project.findById(projectId)
        .populate("creator", "fullName")
        .populate("contributors", "fullName")
        .populate({
            path: "todos", // this property belongs to Project
            populate: {
                path: "user", // this property belongs to Todo model
                select: "fullName" // Return only fullName & _id (hada dayman ma3rood)
            }
        })
        .then((data) => {
            res.status(200).send({ message: "Sucessfuly retrieved project data", data });
        })
        .catch((err) => {
            res.status(500).send({ ...err, status: false });
        });
};
