import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { CSSProperties } from "react";

interface IProps {
  value: string;
  onAdd: () => void;
  onSubtract: () => void;
  style?: CSSProperties;
  minimum?: boolean;
  maximum?: boolean;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => (
  <TextField
    variant="outlined"
    size="small"
    disabled
    value={props.value}
    style={props.style}
    inputProps={{
      // size: props.value.length + 1,
      style: {
        textAlign: "center",
        fontSize: 13,
      },
    }}
    InputProps={{
      style: {
        borderRadius: 0,
        color: "#5d5d5d",
      },
      className: "textInput",
      startAdornment: (
        <InputAdornment position="start">
          <IconButton
            onClick={props.onSubtract}
            disabled={props.minimum}
            size="small"
          >
            <RemoveIcon htmlColor={props.minimum ? "lightgray" : "#ee2677"} />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={props.onAdd}
            disabled={props.maximum}
            size="small"
          >
            <AddIcon htmlColor={props.maximum ? "lightgray" : "#ee2677"} />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);
