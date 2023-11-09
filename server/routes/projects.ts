import { Router } from "express";
import verify from "../middlewares/verify";
import { getProject, getProjects } from "../controllers/project";
import { param } from "express-validator";
import { validateIncData } from "../middlewares/bodyValid";

const projectRouter = Router();

projectRouter.get("/", verify, getProjects);
projectRouter.get(
    "/:project_id",
    verify, // Authorization: using token in the Authorization header
    param("project_id").isMongoId(),
    validateIncData,
    getProject
);

export default projectRouter;
