import React, { ChangeEvent, Children, useCallback, useContext, useState } from "react";
import TodoWrapper from "../../wrappers/TodoWrapper";
import Content from "./Content";
import Actions from "./Actions";
import { validateTodoInput } from "../../../utils/validateInputs";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api";
import { ContributorInt, TodoObj, TodoStatus, UserObj } from "../../../interfaces";
import project from "../../../context/project";
import { createTodo } from "../../../api/todo";
import AlertContext from "../../../context/alert";

const newTodoStyle = { backgroundColor: "#191717", color: "white" };

const NewTodo = ({
    stackStatus,
    setTodos,
}: {
    stackStatus: TodoStatus;
    setTodos: React.Dispatch<React.SetStateAction<TodoObj[]>>;
}) => {
    const ctx = useContext(project);
    const selectedPrj = ctx?.selectedPrj;

    const { setOpen } = useContext(AlertContext);

    const [newTodoInput, setNewTodoInput] = useState("");
    const [newTodoCollabs, setNewTodoCollabs] = useState<UserObj[]>([]);

    const onNewTodoInputChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
        setNewTodoInput(target.value);
    }, []);

    const onCreateNewTodo = useCallback(async () => {
        const isValid: boolean = validateTodoInput(newTodoInput);
        if (!isValid) return toast.warn("Todo name is not valid");

        if (selectedPrj?.id) {
            const requestData = {
                label: newTodoInput,
                status: stackStatus,
                collaborators: newTodoCollabs,
                projectId: selectedPrj?.id,
            };

            const response = await createTodo(requestData);

            if (!response.status) {
                toast.error(
                    response.message ?? "Couldn't create the todo for some reason"
                );
            } else {
                setOpen({ status: true, message: response.message });
                setTodos((prevTodos) => [...prevTodos, response.newTodoData]);
                setNewTodoInput("");
                setNewTodoCollabs([]);
            }
        } else {
            console.error("No project is selected");
        }
    }, [newTodoInput, newTodoCollabs, selectedPrj]);

    const onAddingCollab = useCallback((collaborator: UserObj) => {
        setNewTodoCollabs((prev) => ([...prev, collaborator]));
    }, [newTodoCollabs]);

    return (
        <TodoWrapper
            parentStyle={newTodoStyle}
            content={
                <Content
                    newTodoInput={newTodoInput}
                    onNewTodoInputChange={onNewTodoInputChange}
                    onAddingCollab={onAddingCollab}
                    newTodoCollabs={newTodoCollabs}
                />
            }
            actions={<Actions newTodoInput={newTodoInput} onCreateNewTodo={onCreateNewTodo} />}
        />
    );
};

export default NewTodo;
