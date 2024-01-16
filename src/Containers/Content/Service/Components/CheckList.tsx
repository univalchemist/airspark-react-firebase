import { Checkbox, FormControlLabel, Grid, Radio } from "@material-ui/core";
import React from "react";

interface Choice {
  label: string;
  checked: boolean;
  onChange: () => void;
  radio?: boolean;
}

interface IProps {
  choices: Array<Choice>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => (
  <Grid container direction="column">
    {props.choices.map((g, i) =>
      g.radio ? (
        <Grid item key={i}>
          <FormControlLabel
            control={
              <Radio
                checked={g.checked}
                onChange={g.onChange}
                name={g.label}
                color="primary"
              />
            }
            label={g.label}
          />
        </Grid>
      ) : (
        <Grid item key={i}>
          <FormControlLabel
            control={
              <Checkbox
                checked={g.checked}
                onChange={g.onChange}
                name={g.label}
                color="primary"
              />
            }
            label={g.label}
          />
        </Grid>
      )
    )}
  </Grid>
);
