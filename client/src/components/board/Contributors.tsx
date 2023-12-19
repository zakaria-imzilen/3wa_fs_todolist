import { UserObj } from "../../interfaces";
import Contributor from "./Contributor";
import { Stack } from "@mui/material";

interface ContributorsImp {
  users: UserObj[];
}

const Contributors = ({ users }: ContributorsImp) => {
  return (
    <Stack overflow={"auto"} direction="row" spacing={2}>
      {users.map((user, index) => (
        <Contributor key={user._id + index} data={user} />
      ))}
    </Stack>
  );
};

export default Contributors;
