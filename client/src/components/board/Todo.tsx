import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { TodoObj, TodoStatus } from "../../interfaces";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { green, red, blue } from "@mui/material/colors";

const currentCardBg = {
    [TodoStatus.TODO]: blue[50],
    [TodoStatus.WIP]: blue[100],
    [TodoStatus.DONE]: green[50],
};

const Todo = ({
    todo,
    nextStatus,
    prevStatus,
    handleStatusChange,
}: {
    todo: TodoObj;
    nextStatus: TodoStatus;
    prevStatus: TodoStatus;
    handleStatusChange: (todoId: string, newStatus: TodoStatus) => void;
}) => {
    return (
        <Grid item xs={12}>
            <Card sx={{ backgroundColor: currentCardBg[todo.status] }}>
                <CardContent>
                    <Typography variant="body1" color="HighlightText">
                        {todo.label[0].toUpperCase() + todo.label.slice(1)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            {(todo.status == TodoStatus.WIP || todo.status == TodoStatus.DONE) && (
                                <Button
                                    color="info"
                                    variant="text"
                                    size="small"
                                    endIcon={<KeyboardDoubleArrowLeftIcon color="info" />}
                                    onClick={() => handleStatusChange(todo._id, prevStatus)}
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
                                    onClick={() => handleStatusChange(todo._id, nextStatus)}
                                >
                                    {nextStatus}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Todo;
