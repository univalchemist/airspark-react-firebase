import { Typography } from "@material-ui/core";
import React from "react";
import { IS_MOBILE } from "../../utils/fb";
import { typography } from "./styles";

interface IProps {
  title: string;
  children: React.ReactNode;
  noMobileView?: boolean;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) =>
  props.noMobileView ? (
    <>
      <Typography variant="body1" style={typography}>
        {!IS_MOBILE && props.title}
      </Typography>
      {props.children}
    </>
  ) : (
    <>
      <Typography variant="body1" style={typography}>
        {props.title}
      </Typography>
      {props.children}
    </>
  );
