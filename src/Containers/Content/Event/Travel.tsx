import { Grid } from "@material-ui/core";
import React from "react";
import TextInput from "../../../Components/TextInput";
import { IS_MOBILE } from "../../../utils/fb";
import { EventKeys, IEvent } from "../../../utils/types";
import Section from "../Section";
import SubSection from "../SubSection";

interface IProps {
  event: IEvent;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  return (
    <Section title="Travel">
      <Grid container direction="column" spacing={3}>
        {!IS_MOBILE && (
          <Grid item>
            <Grid container spacing={1}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SubSection title="Travel Distance">
                  <TextInput
                    style={{
                      backgroundColor: "#fafafa",
                    }}
                    disabled
                    value={props.event[EventKeys.Distance]}
                  />
                </SubSection>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SubSection title="Travel Time">
                  <TextInput
                    style={{
                      backgroundColor: "#fafafa",
                    }}
                    disabled
                    value={props.event[EventKeys.TravelTime]}
                  />
                </SubSection>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <SubSection title="Travel Fee" noMobileView>
            <TextInput
              style={{
                backgroundColor: "#fafafa",
              }}
              disabled
              inputProps={{
                style: {
                  fontWeight: "bold",
                  color: "#3d3d3d",
                },
              }}
              value={
                props.event[EventKeys.TravelCost]
                  ? `$${
                      props.event[EventKeys.TravelCost]
                    } due in cash on the night`
                  : "No travel fee applies"
              }
            />
          </SubSection>
        </Grid>
      </Grid>
    </Section>
  );
};
