import { Box, Button } from "@mui/material";
import { ActionsSignature } from "../../../interfaces/newTodo";

const Actions: ActionsSignature = ({ onCreateNewTodo, newTodoInput }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Button
                sx={{
                    display: "block",
                    marginLeft: "auto",
                    color: "white",
                }}
                size="small"
                variant="text"
                onClick={onCreateNewTodo}
                disabled={newTodoInput.length < 3}
            >
                Save
            </Button>
        </Box>
    );
};

export default Actions;
