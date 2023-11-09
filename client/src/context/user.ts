import { createContext } from "react";
import { UserCntxtType } from "../interfaces";

export default createContext<UserCntxtType | null>(null);
