import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { STAGE_NAMES } from "../consts";
import { individualHeaderBody, individualHeaderText } from "./styles";

interface IProps {
  stageName: STAGE_NAMES;
  stageNumber: number;
  active: boolean;
  style?: any;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  return (
    <Grid
      item
      style={{ ...individualHeaderBody(props.active), ...(props.style || {}) }}
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item>
          <Typography variant={"h4"} style={individualHeaderText(props.active)}>
            0{props.stageNumber + 1}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={"h6"} style={individualHeaderText(props.active)}>
            Your {props.stageName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
