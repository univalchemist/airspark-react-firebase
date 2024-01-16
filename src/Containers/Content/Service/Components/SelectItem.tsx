import { Button, ButtonGroup } from "@material-ui/core";
import React, { CSSProperties, forwardRef, Ref } from "react";

interface Choice {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export interface IProps {
  choices: Array<Choice>;
}

const button: CSSProperties = {
  borderRadius: 0,
  textTransform: "none",
  minWidth: 100,
};

const greyedButton: CSSProperties = {
  ...button,
  color: "#8c8c8c",
  backgroundColor: "#fafafa",
  borderColor: "#bcbcbc",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default forwardRef((props: IProps, ref: Ref<any>) => (
  <ButtonGroup color="primary" ref={ref}>
    {props.choices.map((c, i) => (
      <Button
        key={i}
        variant={c.selected ? "contained" : "outlined"}
        style={c.selected ? button : greyedButton}
        onClick={c.onClick}
      >
        {c.label}
      </Button>
    ))}
  </ButtonGroup>
));
