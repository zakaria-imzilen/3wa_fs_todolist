import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
import { fetchProject } from "../api";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TodoObj, TodoStatus } from "../interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const tasksStatus = [TodoStatus.TODO];

const PrjContent = () => {
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);

  const [todos, setTodos] = useState<Array<TodoObj>>([]);
  const [wipTodos, setWIPTodos] = useState<Array<TodoObj>>([]);
  const [doneTodos, setDoneTodos] = useState<Array<TodoObj>>([]);
  const [draggedTodos, setDraggedTodos] = useState<Array<TodoObj>>([]);

  useEffect(() => {
    const { signal } = new AbortController();
    console.log("Project");
    if (projectContext?.selectedPrj?.id && userContext?.user.data?.token) {
      fetchProject({
        access_token:
          userContext?.user.data?.token ?? localStorage.getItem("access_token"),
        prjId: projectContext?.selectedPrj.id,
        signal,
      })
        .then((resp) => {
          if (!resp.status) {
            toast.error(resp.message);
            console.error(resp.message);
          } else {
            toast.success(resp.message);
            projectContext.setSelectedPrj((prev) => ({
              ...prev,
              data: resp.data,
            }));

            setTodos(
              resp.data.todos.filter(
                (todo: TodoObj) => todo.status === TodoStatus.TODO
              )
            );
            setWIPTodos(
              resp.data.todos.filter(
                (todo: TodoObj) => todo.status === TodoStatus.WIP
              )
            );
            setDoneTodos(
              resp.data.todos.filter(
                (todo: TodoObj) => todo.status === TodoStatus.DONE
              )
            );
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }, [projectContext?.selectedPrj?.id, userContext?.user.data?.token]);

  const currentTodos = useMemo(
    () =>
      projectContext?.selectedPrj?.data?.todos.filter(
        (todo) => todo.status == TodoStatus.TODO
      ),
    [projectContext?.selectedPrj?.data]
  );

  const handleOnDragOverTodo = useCallback((e) => e.preventDefault(), []);
  const handleOnDraggingTodo = useCallback((e, todo) => {
    e.preventDefault();
    setDraggedTodos((prev) => [...prev, todo]);
  }, []);

  const onDragEnd = (result) => {
    const newItems = Array.from(todos);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setWIPTodos(newItems);
  };

  return !projectContext?.selectedPrj?.data ? (
    "No project selected yet"
  ) : (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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

      <Container maxWidth={"lg"} sx={{ marginTop: 3 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container>
            { }
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentTodos?.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem>
                            <ListItemButton>
                              <ListItemText primary={item.label} />
                            </ListItemButton>
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </Grid>
        </DragDropContext>
      </Container>
    </Box>
  );
};

export default PrjContent;
