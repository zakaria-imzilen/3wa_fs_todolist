import { Avatar, Box, Chip, Grid, Tooltip, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProjectContext from "../context/project";
import UserContext from "../context/user";
import { fetchProject } from "../api";
import { toast } from "react-toastify";
import { TodoObj, TodoStatus, UserRole } from "../interfaces";
import StatusStack from "./board/StatusStack";
import AlertContext from "../context/alert";
import { handleStatusChangeArgsType } from "../../src/interfaces/projectContent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import { updateTodo } from "../api/todo";
import { AxiosError } from "axios";
import Loading from "./overlays/Loading";
import LoadingContext from "../context/loading";

const tasksStatus = [TodoStatus.TODO, TodoStatus.WIP, TodoStatus.DONE];

const PrjContent = () => {
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { setIsLoading } = useContext(LoadingContext);

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
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [projectContext?.selectedPrj?.id, userContext?.user.isConnected]);

  const handleStatusChange = useCallback(
    async (param: handleStatusChangeArgsType) => {
      const todoId = param.todoId;
      const newStatus = param.status;

      setIsLoading(true);
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
                console.log(todo);
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
      } catch (error) {
        if (error instanceof AxiosError || error instanceof TypeError)
          alertContext.setOpen({
            status: true,
            message: error.message ?? "Something went wrong",
          });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return !projectContext?.selectedPrj?.id ? (
    "No project selected yet"
  ) : projectContext?.selectedPrj?.data ? (
    <>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h4">
          {typeof projectContext?.selectedPrj?.data?.title == "string" &&
            projectContext?.selectedPrj?.data?.title[0].toUpperCase() +
            projectContext?.selectedPrj?.data?.title?.slice(1)}
        </Typography>

        <Typography variant="overline" color="ThreeDShadow">
          {new Date(projectContext?.selectedPrj?.data?.createdAt).toUTCString()}
        </Typography>
      </Grid>

      <Grid marginY={2} container alignItems={"center"} columnGap={3}>
        <Typography variant="subtitle1" textTransform="uppercase">
          Contributors:
        </Typography>
        <Grid container>
          {projectContext.selectedPrj.data?.contributors?.map(
            (contributor, index) => {
              return (
                <Grid
                  item
                  key={
                    "project" +
                    projectContext.selectedPrj?.data?.title +
                    "-contributor-" +
                    contributor._id._id +
                    index
                  }
                >
                  <Tooltip
                    title={
                      contributor.role[0].toUpperCase() +
                      contributor.role.slice(1)
                    }
                  >
                    <Grid container alignItems={"center"} gap={1}>
                      <Avatar
                        src={contributor._id.profile_image}
                        alt={contributor._id.fullName}
                      />
                      <Chip
                        style={{
                          marginRight: ".5rem",
                          backgroundColor:
                            contributor.role == UserRole.Admin
                              ? "#F0ECE5"
                              : "#B6BBC4",
                        }}
                        label={
                          contributor.role[0].toUpperCase() +
                          contributor.role.slice(1) +
                          ": " +
                          contributor._id.fullName
                        }
                      // color={contributor.role == UserRole.Admin ? "primary" : "warning"}
                      />
                    </Grid>
                  </Tooltip>
                </Grid>
              );
            }
          )}
        </Grid>
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
  ) : (
    ""
  );
};

export default PrjContent;
