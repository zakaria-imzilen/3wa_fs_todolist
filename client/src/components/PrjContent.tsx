import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProjectContext from "../context/project";
import UserContext from "../context/user";
import { fetchProject, updateTodo } from "../api";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TodoObj, TodoStatus } from "../interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Status from "./Status";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import StatusStack from "./board/StatusStack";
import AlertContext from "../context/alert";

const tasksStatus = [TodoStatus.TODO, TodoStatus.WIP, TodoStatus.DONE];

const PrjContent = () => {
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const [todos, setTodos] = useState<Array<TodoObj>>([]);

  const tasksTodos = useMemo<Array<TodoObj>>(
    () => todos.filter((todo) => todo.status == TodoStatus.TODO),
    [todos]
  );
  const wipTodos = useMemo<Array<TodoObj>>(
    () => todos.filter((todo) => todo.status == TodoStatus.WIP),
    [todos]
  );
  const doneTodos = useMemo<Array<TodoObj>>(
    () => todos.filter((todo) => todo.status == TodoStatus.DONE),
    [todos]
  );

  useEffect(() => {
    if (projectContext?.selectedPrj?.id && userContext?.user.isConnected) {
      fetchProject({
        prjId: projectContext?.selectedPrj.id,
      })
        .then((resp) => {
          if (!resp.status) {
            toast.error(resp.message);
            console.error(resp.message);
          } else {
            toast.success(resp.message);
            console.log(resp)


            projectContext.setSelectedPrj((prev) => ({
              ...prev,
              data: {
                ...resp.project,
                todos: resp.data
              }
            }));

            setTodos(resp.data);

          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }, [projectContext?.selectedPrj?.id, userContext?.user.data?.token]);

  const handleStatusChange = async (todoId: string, newStatus: TodoStatus) => {
    try {
      const updateResult = await updateTodo(todoId, {
        status: newStatus,
      });

      const { status, message } = updateResult;

      if (status) {
        const { newTodoData } = updateResult;


        // Change UI
        const updatedTodos = todos.map((todo) => {
          if (todo._id === todoId) {
            return newTodoData;
          }
          return todo;
        });
        setTodos(updatedTodos);
      }

      const messageToDisplay = message ? message : status ? "Updated successfuly" : "Couldn't update the todo, please try again!"
      alertContext.setOpen({
        status: true,
        message: messageToDisplay,
      });

      if (!status) return;

    } catch (error) {
      alertContext.setOpen({
        status: true,
        message: error.message ?? "Something went wrong",
      });
    }

    // setTodos(updatedTodos);
  };

  return !projectContext?.selectedPrj?.data ? (
    "No project selected yet"
  ) : (
    <>
      <Typography variant="h4">
        {typeof projectContext?.selectedPrj?.data?.title == "string" &&
          projectContext?.selectedPrj?.data?.title[0].toUpperCase() +
          projectContext?.selectedPrj?.data?.title?.slice(1)}

        <Chip
          sx={{ marginLeft: 2 }}
          label={new Date(
            projectContext?.selectedPrj?.data?.createdAt
          ).toUTCString()}
        />
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body2">Contributors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {projectContext.selectedPrj.data?.contributors?.map((contrib) => (
            <Chip
              key={contrib._id}
              label={contrib.fullName}
              color="info"
              sx={{ marginRight: 2 }}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Grid
        container
        maxWidth={"lg"}
        gap={2}
        wrap="nowrap"
        sx={{ marginTop: 3 }}
      >
        {tasksStatus.map((status) => (
          <StatusStack
            key={status}
            status={status}
            todos={
              status == TodoStatus.TODO
                ? tasksTodos
                : status == TodoStatus.WIP
                  ? wipTodos
                  : doneTodos
            }
            handleStatusChange={handleStatusChange}
          />
        ))}
      </Grid>
    </>
  );
};

export default PrjContent;
