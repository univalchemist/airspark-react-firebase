import { CircularProgress, Grid } from "@material-ui/core";
import React, { CSSProperties } from "react";

const container: CSSProperties = {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 100000,
  overflow: "hidden",
};
const loading: CSSProperties = {
  height: "100%",
  width: "100%",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div style={container}>
      <Grid container style={loading} justify="center" alignItems="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  );
};
