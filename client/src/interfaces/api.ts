import { TodoObj } from "../interfaces";

export interface updateTodoIntSucc {
    status: true;
    message: string;
    newTodoData: TodoObj;
}

export interface updateTodoIntFail {
    status: false;
    message: string;
}
