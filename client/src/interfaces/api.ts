import { TodoObj } from "../interfaces";

export interface createTodoIntSucc {
    status: true;
    message: string;
    newTodoData: TodoObj;
}

export interface createTodoIntFail {
    status: false;
    message: string;
}

export interface updateTodoIntSucc {
    status: true;
    message: string;
    newTodoData: TodoObj;
}

export interface updateTodoIntFail {
    status: false;
    message: string;
}