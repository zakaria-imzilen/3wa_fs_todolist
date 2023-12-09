import { Box, Chip, Grid, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ProjectContext from "../context/project";
import UserContext from "../context/user";
import { fetchProject } from "../api";
import { toast } from "react-toastify";
import { TodoObj, TodoStatus, UserRole } from "../interfaces";
import StatusStack from "./board/StatusStack";
import AlertContext from "../context/alert";
import { handleStatusChangeArgsType } from "../../src/interfaces/projectContent";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import { updateTodo } from "../api/todo";

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
            console.log(resp);

            projectContext.setSelectedPrj((prev) => ({
              ...prev,
              data: {
                ...resp.project,
                todos: resp.data,
              },
            }));

            setTodos(resp.data);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }, [projectContext?.selectedPrj?.id, userContext?.user.isConnected]);

  const handleStatusChange = useCallback(async (param: handleStatusChangeArgsType) => {
    const todoId = param.todoId;
    const newStatus = param.status;

    try {
      const updateResult = await updateTodo(todoId, {
        status: newStatus,
      });

      const { status, message } = updateResult;

      if (status) {
        const { newTodoData } = updateResult;

        // Change UI

        setTodos((todos) => {
          const updatedTodos = todos.map((todo) => {
            if (todo._id === todoId) {
              console.log(todo)
              return newTodoData;
            }
            return todo;
          });

          return updatedTodos;
        });
      }

      const messageToDisplay = message
        ? message
        : status
          ? "Updated successfuly"
          : "Couldn't update the todo, please try again!";
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
  }, []);

  return !projectContext?.selectedPrj?.data ? (
    "No project selected yet"
  ) : (
    <>

      <Grid container alignItems={"center"} justifyContent={"space-between"}>

        <Typography variant="h4">
          {typeof projectContext?.selectedPrj?.data?.title == "string" &&
            projectContext?.selectedPrj?.data?.title[0].toUpperCase() +
            projectContext?.selectedPrj?.data?.title?.slice(1)}
        </Typography>

        <Typography variant="overline" color="ThreeDShadow">
          {new Date(
            projectContext?.selectedPrj?.data?.createdAt
          ).toUTCString()}
        </Typography>
      </Grid>

      <Grid container alignItems={"center"} columnGap={3}>
        <Typography variant="subtitle1" textTransform="uppercase">
          Contributors:
        </Typography>
        <Box>
          {projectContext.selectedPrj.data?.contributors?.map(
            (contributor) => {
              console.log(contributor);
              return (
                <Tooltip
                  key={"contributor-" + contributor._id._id}
                  title={
                    contributor.role[0].toUpperCase() +
                    contributor.role.slice(1)
                  }
                >
                  <Chip
                    style={{
                      marginRight: ".5rem",
                      backgroundColor:
                        contributor.role == UserRole.Admin
                          ? "#F0ECE5"
                          : "#B6BBC4",
                    }}
                    icon={contributor.role == UserRole.Admin ? <SupervisorAccountIcon /> : <PersonIcon />}
                    label={contributor.role[0].toUpperCase() + contributor.role.slice(1) + ": " + contributor._id.fullName}
                  // color={contributor.role == UserRole.Admin ? "primary" : "warning"}
                  />
                </Tooltip>
              );
            }
          )}
        </Box>
      </Grid>

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
            setTodos={setTodos}
            handleStatusChange={handleStatusChange}
          />
        ))}
      </Grid>
    </>
  );
};

export default PrjContent;
