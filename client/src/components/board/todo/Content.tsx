import { Typography } from "@mui/material";
import React, { memo } from "react";
import { TodoObj } from "../../../interfaces";
import Contributors from "../Contributors";

interface ContentImp {
    todo: TodoObj;
}

const Content = ({ todo }: ContentImp): React.JSX.Element => (
    <>
        <Typography variant="body1" color="white" marginBottom={2}>
            {todo.label[0].toUpperCase() + todo.label.slice(1)}
        </Typography>

        <Contributors users={todo.collaborators} />
    </>
);

export default memo(Content);
