import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { body, itemBody, titleStyle } from "./styles";

interface IProps {
  title: string;
  children: React.ReactNode;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => (
  <Grid container style={body} wrap="wrap">
    <Grid item lg={4} md={12} sm={12} xs={12} style={itemBody}>
      <Typography variant="h6" style={titleStyle}>
        {props.title}
      </Typography>
    </Grid>
    <Grid item style={itemBody} lg={8} md={12} sm={12} xs={12}>
      {props.children}
    </Grid>
  </Grid>
);
