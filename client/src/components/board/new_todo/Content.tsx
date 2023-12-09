import { Input } from "@mui/material";
import React from "react";
import { onNewTodoInputChangeImp } from "../../../interfaces/newTodo";

interface ContetnInt {
    onNewTodoInputChange: onNewTodoInputChangeImp;
    newTodoInput: string;
}

const Content = ({ onNewTodoInputChange, newTodoInput }: ContetnInt) => {
    return (
        <Input
            style={{ color: "white" }}
            color="primary"
            size="small"
            value={newTodoInput}
            onChange={onNewTodoInputChange}
            maxRows={3}
            fullWidth
            aria-label="New Todo input"
            multiline
            placeholder="Type something…"
        />
    );
};

export default Content;
