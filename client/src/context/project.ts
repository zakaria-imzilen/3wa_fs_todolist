import { createContext } from "react";
import { ProjectCntxtType } from "../interfaces";

export default createContext<ProjectCntxtType | null>(null);
