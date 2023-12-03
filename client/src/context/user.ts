import { createContext } from "react";
import { UserCntxtType } from "../interfaces";

const UserContext = createContext<UserCntxtType>({ setUser: () => { }, user: { isConnected: false, data: null }, });

export default UserContext;
