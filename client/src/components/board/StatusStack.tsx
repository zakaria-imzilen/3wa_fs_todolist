import React from "react";
import { TodoStatus, TodoObj } from "../../interfaces";
import {
    Grid,
} from "@mui/material";
import Todo from "./Todo";

const StatusStack = ({
    status,
    todos,
    handleStatusChange,
}: {
    status: TodoStatus;
    todos: TodoObj[];
    handleStatusChange: (todoId: string, newStatus: TodoStatus) => Promise<void>;
}) => {
    return (
        <Grid item xs={4} key={status}>
            <h3>{status}</h3>
            <Grid container gap={2} direction={"column"}>
                {todos.map((todo) => {
                    const nextStatus =
                        status == TodoStatus.TODO ? TodoStatus.WIP : TodoStatus.DONE;
                    const prevStatus =
                        status == TodoStatus.WIP ? TodoStatus.TODO : TodoStatus.WIP;
                    return (
                        <Todo
                            key={todo._id}
                            todo={todo}
                            nextStatus={nextStatus}
                            prevStatus={prevStatus}
                            handleStatusChange={handleStatusChange}
                        />
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default StatusStack;
