import { Router } from "express";
import passport from "passport";
import { getTodos } from "../controllers/todo";
import verify from "../middlewares/verify";

const TodoRouter = Router();

TodoRouter.get("/", verify, getTodos);

export default TodoRouter;
