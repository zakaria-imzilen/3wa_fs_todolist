import { createContext } from "react";
import { AlertContextInt } from "../interfaces";

const AlertContext = createContext<AlertContextInt>({ open: { status: false, message: "" }, setOpen: () => { } });

export default AlertContext