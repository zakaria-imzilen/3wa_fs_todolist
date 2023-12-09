import { ChangeEventHandler, FormEvent } from "react";

export type onNewTodoInputChangeImp = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type ActionsSignature = ({ onCreateNewTodo }) => JSX.Element;