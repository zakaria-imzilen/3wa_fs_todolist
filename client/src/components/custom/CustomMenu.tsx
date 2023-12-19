import { Menu } from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

type CustomMenuImp = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    anchorEl: null | HTMLElement;
    setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
    children: ReactNode,
};

const CustomMenu = ({ anchorEl, setAnchorEl, children }: CustomMenuImp) => {
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Menu
            id="add-contributors"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            {children}
        </Menu>
    );
};

export default CustomMenu;
