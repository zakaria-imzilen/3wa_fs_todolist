export interface TodoObj {
    id: String;
    label: String;
}

export enum UserRole {
    Admin = "admin",
    User = "user"
}

export interface UserObj {
    _id: String,
    id: String,
    fullName: String,
    email: String,
    pwd: String,
    role: UserRole
}

export interface PrjObj {
    _id: String,
    id: String,
    title: String,
    creator: UserObj,
    contributors: Array<UserObj>,
    todos: Array<TodoObj>,
    created_at: String,
    updated_at: String,
}

export enum TodoStatus {
    TODO = "TODO",
    WIP = "WIP",
    DONE = "DONE"
}