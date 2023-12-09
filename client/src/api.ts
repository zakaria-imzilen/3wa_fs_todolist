import axios, { AxiosError } from "axios";
import {
    TodoObj,
    TodoObjNotOptionalProperties,
    UserObj,
} from "./interfaces";
import { updateTodoIntFail, updateTodoIntSucc } from "./interfaces/api";

export const baseAPIUrl = "http://localhost:4000";

export const axiosInstance = axios.create({
    baseURL: baseAPIUrl,
    headers: {
        origin: "*",
    },
    withCredentials: true,
});

export const fetchProjects = async () => {
    try {
        const fetching = await axiosInstance.get("/projects");

        const response = await fetching.data;
        console.log("Headers", fetching.headers);

        if (fetching.status !== 200) {
            console.error(response.data);
            return { status: false, ...response };
        } else {
            return { status: true, ...response };
        }
    } catch (err) {
        console.error("Trying to fetching projects: ", err);
        return { status: false, ...err };
    }
};

export const fetchProject = async ({ prjId }) => {
    if (!prjId) {
        return { status: false, message: "Project Id not provided" };
    }

    try {
        const { data, status } = await axiosInstance.get(`/todos/project/${prjId}`);

        if (status !== 200) {
            console.error(data);
            return { status: false, ...data };
        } else {
            return { status: true, ...data };
        }
    } catch (error) {
        console.error(error);
        return { status: false, ...error };
    }
};

export const loginToken = async () => {
    // GET /auth/
    try {
        const fetching = await axiosInstance.get(`/auth`);

        const response = await fetching.data;

        if (fetching.status !== 200) {
            console.error(response);
            return { data: response, status: false };
        } else {
            console.info(response);
            return { data: response, status: true };
        }
    } catch (error) {
        console.error(error);
        return { ...error, status: false };
    }
};

type loginEmailPwdReturnSucc = Promise<{
    status: true;
    message: string;
    user: UserObj;
}>;

type loginEmailPwdReturnFail = Promise<{
    status: false;
    message: string;
}>;
export const loginEmailPwd = async ({
    email,
    pwd,
}): Promise<loginEmailPwdReturnSucc | loginEmailPwdReturnFail> => {
    try {
        const { data } = await axiosInstance.post(`/auth/signin`, {
            email,
            pwd,
        });

        console.log(data);
        return { ...data.data, status: true };
    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) return ({
            status: false,
            message: error.response?.data.message,
        })

        return {
            message: error.message ?? "Could'nt login for some reason",
            status: false,
        };
    }
};
