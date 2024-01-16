import { FormControl, MenuItem, Select } from "@material-ui/core";
import React from "react";

interface IProps {
  value: string;
  onChange:
    | ((
        event: React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
        }>,
        child?: React.ReactNode
      ) => void)
    | undefined;
  disabled?: boolean;
  menuItems: Array<{
    value: string;
    label: string;
  }>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => (
  <FormControl
    variant={"outlined"}
    fullWidth={true}
    size="small"
    color="secondary"
  >
    <Select
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    >
      {props.menuItems.map((m, i) => (
        <MenuItem value={m.value} key={i}>
          {m.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
