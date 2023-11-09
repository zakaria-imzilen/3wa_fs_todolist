import { NextFunction, Request, Response } from "express";
import { TodoObj } from "../interfaces";
import Todo from "../models/Todo";

const DOCUMENTS_PER_PAGE = 10;

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
    const todo: TodoObj = req.body.todo;

    if (!todo || Object.keys(todo).length == 0) {
        return next({ message: "Todo object is invalid" });
    }

    Todo.create(todo)
        .then((resp) => {
            res
                .status(201)
                .send({
                    message: "Todo Created successfuly",
                    todoId: resp.toJSON().id,
                });
        })
        .catch((err) => {
            throw err;
        });
};

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page;

    if (!page) {
        Todo.find().then((resp) => {
            res.status(200).send({ status: true, data: resp });
        }).catch((err) => {
            console.log(err)
            next({ ...err, status: 400 });
        });
    } else {
        Todo.find().skip(Number(page) == 1 ? 0 : Number(page) * DOCUMENTS_PER_PAGE).then((resp) => {
            res.status(200).send({ status: true, data: resp });
        }).catch((err) => {
            console.log(err)

            next({ ...err, status: 400 });
        });
    }

}