import { Router } from "express";
import {
    createNewTodo,
    getProjectTodos,
    getTodos,
    updateTodo,
} from "../controllers/todo";
import verify from "../middlewares/verify";
import {
    expressValidPrjIdMidd,
    expressValidTodoIdMidd,
    validateParam,
} from "../middlewares/paramsValid";
import { checkAndSaveProjectData } from "../middlewares/project";

const TodoRouter = Router();

TodoRouter.get("/", verify, getTodos);
TodoRouter.get(
    "/project/:project_id",
    verify,
    expressValidPrjIdMidd,
    validateParam,
    getProjectTodos
);

TodoRouter.post(
    "/project/:project_id",
    verify,
    expressValidPrjIdMidd,
    validateParam,
    checkAndSaveProjectData,
    createNewTodo
);

TodoRouter.put(
    "/:todo_id",
    verify,
    expressValidTodoIdMidd,
    validateParam,
    updateTodo
);

export default TodoRouter;
