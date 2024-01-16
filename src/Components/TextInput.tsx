import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: TextFieldProps) => (
  <TextField
    fullWidth
    size="small"
    variant="outlined"
    color="secondary"
    {...props}
  />
);
