import { toast } from "react-toastify";
import { axiosInstance } from "../api";
import {
    ContributorInt,
    TodoObjNotOptionalProperties,
    TodoStatus,
    UserObj,
} from "../interfaces";
import {
    createTodoIntFail,
    createTodoIntSucc,
    updateTodoIntFail,
    updateTodoIntSucc,
} from "../interfaces/api";
import { AxiosError } from "axios";

export const createTodo = async (newData: {
    label: string;
    status: TodoStatus;
    projectId: string;
    collaborators: UserObj[];
}): Promise<createTodoIntSucc | createTodoIntFail> => {
    try {
        const { data, status } = await axiosInstance.post(
            `/todos/project/${newData.projectId}`,
            newData
        );

        if (status == 201) {
            return {
                status: true,
                message: data.message,
                newTodoData: data.data,
            };
        }
        return {
            status: false,
            message: data.message,
        };
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError || error instanceof TypeError)
            return {
                status: false,
                message: error.message,
            };

        return {
            message: "Couldn't update the todo",
            status: false,
        }
    }
};

export const updateTodo = async (
    todoId: string,
    newData: TodoObjNotOptionalProperties
): Promise<updateTodoIntSucc | updateTodoIntFail> => {
    try {
        const { status, data } = await axiosInstance.put(
            `/todos/${todoId}`,
            newData
        );

        if (status === 200)
            return { status: true, message: data?.message, newTodoData: data.data };
        return { status: false, message: data.message };
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError || error instanceof TypeError) return {
            message: error.message,
            status: false,
        };

        return ({
            message: "Couldn't update the todo",
            status: false,
        })
    }
};
