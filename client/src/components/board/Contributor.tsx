import React from "react";
import { UserObj } from "../../interfaces";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";

interface ContributorImp {
    data: UserObj;
}

const Contributor = ({ data }: ContributorImp) => {
    return (
        <Tooltip title={data.fullName}>
            <Avatar
                sx={{ width: 30, height: 30 }}
                alt={data.fullName}
                src={data.profile_image}
            />
        </Tooltip>
    );
};

export default Contributor;
