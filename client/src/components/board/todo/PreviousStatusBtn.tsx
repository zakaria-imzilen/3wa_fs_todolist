import { Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { handleStatusChangeArgsType } from "../../../interfaces/projectContent";
import { TodoStatus } from "../../../interfaces";

const PreviousStatusBtn = ({
    handleStatusChange,
    prevStatus,
    id,
}: {
    handleStatusChange: (param: handleStatusChangeArgsType) => void;
    id: string;
    prevStatus: TodoStatus;
}) => {
    return (
        <Button
            color="secondary"
            variant="text"
            size="small"
            endIcon={<KeyboardDoubleArrowLeftIcon color="secondary" />}
            onClick={() => handleStatusChange({ todoId: id, status: prevStatus })}
        >
            {prevStatus}
        </Button>
    );
};

export default PreviousStatusBtn;
