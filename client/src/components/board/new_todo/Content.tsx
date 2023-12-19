import { Avatar, Grid, IconButton, Input, MenuItem } from "@mui/material";
import { onNewTodoInputChangeImp } from "../../../interfaces/newTodo";
import { useCallback, useContext, useMemo, useState } from "react";
import CustomMenu from "../../custom/CustomMenu";
import project from "../../../context/project";
import { UserObj } from "../../../interfaces";
import Contributors from "../Contributors";
import { GroupAddSharp } from "@mui/icons-material";
import { isContribAlreadyExists } from "./helpers";
import { toast } from "react-toastify";

interface ContetnInt {
    onNewTodoInputChange: onNewTodoInputChangeImp;
    newTodoInput: string;
    onAddingCollab: (collaborator: UserObj) => void;
    newTodoCollabs: UserObj[];
}

const iconBtnStyle = {
    marginTop: 10,
    border: "1px dashed darkgrey",
    color: "darkgrey",
};

const Content = ({
    onNewTodoInputChange,
    newTodoInput,
    onAddingCollab,
    newTodoCollabs,
}: ContetnInt) => {
    const { selectedPrj } = useContext(project);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const contributors = useMemo(() => {
        if (selectedPrj?.data) {
            const convertContribObjToUser = selectedPrj.data.contributors.map(
                (contrib) => ({
                    ...contrib._id,
                })
            );

            return convertContribObjToUser;
        }
        return [];
    }, [selectedPrj?.data?.contributors, newTodoCollabs]);

    const handleContribChange = useCallback(
        (contrib: UserObj) => {
            setAnchorEl(null);

            if (isContribAlreadyExists(newTodoCollabs, contrib))
                return toast.warn("Task already assigned to");

            onAddingCollab(contrib);
        },
        [newTodoCollabs]
    );

    return (
        <>
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

            <Grid marginTop={2} container alignItems={"center"} gap={2}>
                <IconButton onClick={handleClick} size="small">
                    <Avatar sx={{ width: 24, height: 24 }} variant="rounded">
                        <GroupAddSharp color={"action"} fontSize={"small"} />
                    </Avatar>
                </IconButton>

                <Contributors users={newTodoCollabs} />
            </Grid>

            <CustomMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClick={handleClick}
            >
                {contributors?.map((contrib) => (
                    <MenuItem
                        key={contrib._id}
                        onClick={() => handleContribChange(contrib)}
                    >
                        {contrib.fullName}
                    </MenuItem>
                ))}
            </CustomMenu>
        </>
    );
};

export default Content;
