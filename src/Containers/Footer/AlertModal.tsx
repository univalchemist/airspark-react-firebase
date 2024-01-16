import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { resetApp } from "../../utils/fb";
import { StatusStates } from "./index";
interface IProps {
  error: boolean;
  message: string;
  setStatus: (arg0: any) => void;
  onOkay?: () => void;
}
const useStyles = makeStyles((theme: any) => ({
  padded: {
    padding: theme.spacing(3),
    borderRadius: 0,
  },
}));

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      open
      maxWidth={"md"}
      PaperProps={{
        className: [classes.padded].join(" "),
      }}
    >
      <DialogTitle>{props.error ? "Error" : "Success"}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          style={{
            textAlign: "center",
            color: props.error ? "red" : "green",
          }}
        >
          {props.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setStatus({
              status: StatusStates.Waiting,
              message: "",
            });
            if (!props.error) {
              resetApp();
              return props.onOkay?.();
            }
          }}
          color="primary"
          variant="contained"
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
