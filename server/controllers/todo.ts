import { NextFunction, Request, Response } from "express";
import Todo from "../models/Todo";
import { activityLogger } from "../config/logger";
import { MongooseError } from "mongoose";
import Project from "../models/Project";

const DOCUMENTS_PER_PAGE = 10;

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page;

    if (!page) {
        Todo.find()
            .then((resp) => {
                res.status(200).send({ status: true, data: resp });
            })
            .catch((err) => {
                console.log(err);
                next({ ...err, status: 400 });
            });
    } else {
        Todo.find()
            .skip(Number(page) == 1 ? 0 : Number(page) * DOCUMENTS_PER_PAGE)
            .then((resp) => {
                res.status(200).send({ status: true, data: resp });
            })
            .catch((err) => {
                console.log(err);

                next({ ...err, status: 400 });
            });
    }
};

export const getProjectTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { project_id } = req.params;

    try {
        const projectData = await Project.findById(project_id)
            .populate("contributors._id")
            .populate("creator");

        res.status(200).send({
            message: "Successfuly retrieved project todos",
            data: await Todo.find({ projectId: project_id })
                .populate("collaborators")
                .select("-projectId"),
            project: projectData,
        });
    } catch (err) {
        activityLogger.error(err);
        console.error(err);
        next({
            status: 500,
            message:
                err instanceof MongooseError ? err.message : "Something went wrong",
        });
    }
};

export const createNewTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const creatingTodo = await (
            await Todo.create({
                ...req.body,
                projectId: req.project._id,
                user: req.admin._id,
            })
        ).save();

        if (!createNewTodo)
            return next({ status: 400, message: "Couldn't insert todos" });
        return res
            .status(201)
            .send({
                message: "Successfuly created",
                data: await creatingTodo.populate("collaborators"),
            });
    } catch (error) {
        activityLogger.error(error);
        console.error(error);
        next({
            status: 500,
            message:
                error instanceof MongooseError ? error.message : "Something went wrong",
        });
    }
};

export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { todo_id } = req.params;

    try {
        const updating = await Todo.findOneAndUpdate({ _id: todo_id }, req.body, {
            new: true,
        }).populate("collaborators");

        if (!updating)
            return res
                .status(404)
                .send({ message: `Could't find the todo provided` });
        console.log(updating);
        return res.status(200).send({
            message: `${updating.label} updated succesfuly`,
            data: updating.toObject(),
        });
    } catch (error) {
        activityLogger.error(error);

        if (error instanceof MongooseError) {
            return next({
                status: 500,
                message: error.message ?? "Something went wrong",
            });
        }
        return next({ status: 500, message: "Something went wrong" });
    }
};
