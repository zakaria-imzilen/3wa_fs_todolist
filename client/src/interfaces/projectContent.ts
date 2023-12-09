import { TodoStatus } from "../interfaces";

export type handleStatusChangeArgsType = {
    todoId: string;
    status: TodoStatus;
};