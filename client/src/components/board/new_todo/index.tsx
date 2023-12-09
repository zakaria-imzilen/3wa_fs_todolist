import React, { Children, useCallback, useContext, useState } from "react";
import TodoWrapper from "../../wrappers/TodoWrapper";
import Content from "./Content";
import Actions from "./Actions";
import { validateTodoInput } from "../../../utils/validateInputs";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api";
import { TodoObj, TodoStatus } from "../../../interfaces";
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

    const onNewTodoInputChange = useCallback(({ target }) => {
        setNewTodoInput(target.value);
    }, []);

    const onCreateNewTodo = useCallback(async () => {
        const isValid: boolean = validateTodoInput(newTodoInput);
        if (!isValid) return toast.warn("Todo name is not valid");

        if (selectedPrj?.id) {
            const requestData = {
                label: newTodoInput,
                status: stackStatus,
                collaborators: [],
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
            }
        } else {
            console.error("No project is selected");
        }
    }, [newTodoInput, selectedPrj]);

    return (
        <TodoWrapper
            parentStyle={newTodoStyle}
            content={
                <Content
                    newTodoInput={newTodoInput}
                    onNewTodoInputChange={onNewTodoInputChange}
                />
            }
            actions={<Actions onCreateNewTodo={onCreateNewTodo} />}
        />
    );
};

export default NewTodo;
