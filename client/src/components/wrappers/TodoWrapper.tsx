import React, { FC, useContext } from "react";
import UserContext from "../../context/user";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";

interface TodoWrapperInt {
  content: React.JSX.Element;
  actions: React.JSX.Element;
  parentStyle?: React.CSSProperties;
  // functionnalities: FC;
}

const TodoWrapper = ({
  content,
  actions,
  parentStyle
  // functionnalities
}: TodoWrapperInt) => (
  <Grid item xs={12}>
    <Card
      style={parentStyle}
    >
      {/* Content */}
      <CardContent>
        {content}
      </CardContent>

      {/* Actions */}
      <CardActions>
        {actions}
      </CardActions>
    </Card>
  </Grid>
);

export default TodoWrapper;
