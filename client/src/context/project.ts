import { createContext } from "react";
import { ProjectCntxtType } from "../interfaces";

export default createContext<ProjectCntxtType>(
    {
        setProjects: () => { },
        projects: [],
        selectedPrj: null,
        setSelectedPrj: () => { }
    }
);
