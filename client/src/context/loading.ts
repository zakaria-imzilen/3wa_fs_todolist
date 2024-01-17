import { createContext } from "react";
import { ILoadingContext } from "../interfaces";

const LoadingContext = createContext<ILoadingContext>({
    isLoading: false,
    setIsLoading: () => { }
})

export default LoadingContext