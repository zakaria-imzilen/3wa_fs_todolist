import { ChangeEvent, ChangeEventHandler, FormEvent } from "react";

export type onNewTodoInputChangeImp = ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
>;

export type ActionsSignature = (params: {
    onCreateNewTodo: () => void,
    newTodoInput: string,
}) => JSX.Element;
