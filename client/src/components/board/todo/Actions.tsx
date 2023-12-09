import { Button, Grid } from "@mui/material";
import React, { memo } from "react";
import { TodoObj, TodoStatus } from "../../../interfaces";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { handleStatusChangeArgsType } from "../../../interfaces/projectContent";

interface ActionsInt {
  todo: TodoObj;
  handleStatusChange: (param: handleStatusChangeArgsType) => void;
}

const Actions = ({ todo, handleStatusChange }: ActionsInt) => {
  const nextStatus =
    todo.status == TodoStatus.TODO ? TodoStatus.WIP : TodoStatus.DONE;
  const prevStatus =
    todo.status == TodoStatus.WIP ? TodoStatus.TODO : TodoStatus.WIP;

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        {(todo.status == TodoStatus.WIP || todo.status == TodoStatus.DONE) && (
          <Button
            color="secondary"
            variant="text"
            size="small"
            endIcon={<KeyboardDoubleArrowLeftIcon color="secondary" />}
            onClick={() =>
              handleStatusChange({ todoId: todo._id, status: prevStatus })
            }
          >
            {prevStatus}
          </Button>
        )}
      </Grid>

      <Grid>
        {todo.status != TodoStatus.DONE && (
          <Button
            color="success"
            variant="text"
            size="small"
            endIcon={<KeyboardDoubleArrowRightIcon color="success" />}
            onClick={() =>
              handleStatusChange({ todoId: todo._id, status: nextStatus })
            }
          >
            {nextStatus}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(Actions);
