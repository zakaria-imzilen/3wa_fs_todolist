import React from "react";
import { TodoStatus, TodoObj } from "../../interfaces";
import { Chip, Grid, Typography } from "@mui/material";
import { handleStatusChangeArgsType } from "../../interfaces/projectContent";
import TodoWrapper from "../wrappers/TodoWrapper";
import Actions from "./todo/Actions";
import Content from "./todo/Content";
import NewTodo from "./new_todo";

const parentStyle = {
    backgroundColor: "#B6BBC4",
    placeSelf: "flex-start",
    maxHeight: "70vh",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    overflowY: "auto",
};

const titleStyle = {
    backgroundColor: "#161a30",
    borderBottom: "1px solid white",
    padding: 2,
    zIndex: 10,
    position: "sticky",
    top: 0,
    left: 0,
    marginBottom: 0.5,
    fontFamily: "sans-serif",
    fontWeight: 700,
};

interface StatusStackImp {
    status: TodoStatus;
    todos: TodoObj[];
    handleStatusChange: (param: handleStatusChangeArgsType) => void;
    setTodos: React.Dispatch<React.SetStateAction<TodoObj[]>>;
}

const StatusStack = ({
    status,
    todos,
    handleStatusChange,
    setTodos,
}: StatusStackImp) => {
    return (
        <Grid
            item
            xs={4}
            key={status}
            sx={parentStyle}
            borderRadius={2}
            paddingBottom={0.5}
        >
            <Typography variant="h6" sx={titleStyle}>
                {status}
                <Chip
                    label={todos.length}
                    sx={{ marginLeft: 1 }}
                    color="secondary"
                    size="small"
                />
            </Typography>
            <Grid
                borderRadius={2}
                container
                gap={0.5}
                direction={"column"}
                paddingX={0.5}
            >
                <NewTodo setTodos={setTodos} stackStatus={status} />

                {todos.map((todo) => {
                    return (
                        <TodoWrapper
                            key={todo._id}
                            parentStyle={{
                                backgroundColor: "rgb(22, 26, 48)",
                            }}
                            content={<Content todo={todo} />}
                            actions={
                                <Actions handleStatusChange={handleStatusChange} todo={todo} />
                            }
                        />
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default StatusStack;
