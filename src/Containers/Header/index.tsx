import { Grid } from "@material-ui/core";
import React from "react";
import { IS_MOBILE } from "../../utils/fb";
import { STAGE_NAMES } from "../consts";
import IndividualHeader from "./IndividualHeader";
import { containerBody } from "./styles";

interface IProps {
  stage: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  if (IS_MOBILE) {
    return (
      <IndividualHeader
        key={Object.values(STAGE_NAMES)[props.stage]}
        stageName={Object.values(STAGE_NAMES)[props.stage]}
        stageNumber={props.stage}
        active={true}
        style={{
          paddingTop: 20,
          paddingLeft: 20,
        }}
      />
    );
  }
  return (
    <Grid container style={containerBody} wrap="nowrap" justify="space-around">
      {Object.values(STAGE_NAMES).map((stageName, stageNumber) => (
        <IndividualHeader
          key={stageName}
          stageName={stageName}
          stageNumber={stageNumber}
          active={stageNumber === props.stage}
        />
      ))}
    </Grid>
  );
};
