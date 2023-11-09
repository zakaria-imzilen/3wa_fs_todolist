import { Dispatch, SetStateAction } from "react";

export enum TodoStatus {
    TODO = "TODO",
    WIP = "WIP",
    DONE = "DONE"
}

export interface TodoObj {
    _id: string;
    label: string;
    status: TodoStatus;
}


export interface UserObj {
    _id: string,
    fullName: string,
    email: string,
    pwd: string,
    token: string
}

export interface UserCntxtType {
    user: { isConnected: boolean, data: null | UserObj },
    setUser: Dispatch<SetStateAction<{ isConnected: boolean, data: null | UserObj }>>
}

export interface PrjObj {
    _id: string,
    title: string,
    creator: UserObj,
    contributors: Array<UserObj>,
    todos: Array<TodoObj>,
    createdAt: string,
    updatedAt: string,
}

export interface ProjectCntxtType {
    setProjects: Dispatch<SetStateAction<never[]>>,
    projects: PrjObj[],
    selectedPrj: null | { id: null | string, data: null | PrjObj },
    setSelectedPrj: Dispatch<SetStateAction<{ id: null | string, data: null | PrjObj }>>,
};