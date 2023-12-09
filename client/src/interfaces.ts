import { Dispatch, SetStateAction } from "react";

export enum TodoStatus {
    TODO = "TODO",
    WIP = "WIP",
    DONE = "DONE"
}

export interface TodoObj {
    _id: string;
    id: string;
    label: string;
    status: TodoStatus;
}

export interface TodoObjNotOptionalProperties {
    label?: string;
    status?: TodoStatus;
}

export interface TodoObjToUpdate {
    _id: string;
    newData: TodoObjNotOptionalProperties;
}

export interface UserObj {
    _id: string,
    fullName: string,
    email: string,
    pwd: string,
}

export enum UserRole {
    Admin = "admin",
    User = "user"
}

export interface ContributorInt {
    _id: {
        _id: string,
        id: string,
        fullName: string,
        email: string,
        pwd: string,
    },
    role: UserRole
}

export interface UserCntxtType {
    user: { isConnected: boolean, data: null | UserObj },
    setUser: Dispatch<SetStateAction<{ isConnected: boolean; data: UserObj | null; }>>
}

export interface PrjObj {
    _id: string,
    id: string,
    title: string,
    creator: UserObj,
    contributors: Array<ContributorInt>,
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

export interface AlertContextInt {
    open: { status: boolean, message: string },
    setOpen: Dispatch<SetStateAction<{ status: boolean, message: string }>>
}