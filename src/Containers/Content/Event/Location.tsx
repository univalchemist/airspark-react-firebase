import { Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import SelectDropdown from "../../../Components/SelectDropdown";
import { getSetting } from "../../../utils/helpers";
import { EventKeys, IData, IEvent } from "../../../utils/types";
import Section from "../Section";
import SubSection from "../SubSection";
import ChooseLocation from "./ChooseLocation";

interface IProps {
  data: IData;
  event: IEvent;
  setEvent: (event: IEvent) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  const setCity = (cityKey: any) => {
    let eventCopy = _.cloneDeep(props.event);
    eventCopy[EventKeys.City] = cityKey;
    delete eventCopy[EventKeys.Address];
    delete eventCopy[EventKeys.LocationUrl];
    delete eventCopy[EventKeys.TravelTime];
    delete eventCopy[EventKeys.Distance];
    delete eventCopy[EventKeys.TravelCost];
    if (_.isEqual(eventCopy, props.event)) {
      return;
    }
    props.setEvent(eventCopy);
  };

  const getTravelCost = (distance: number, time: number): number => {
    distance = (distance / 1000) * 2;
    time = time / 3600;
    const travelFeePerKm = getSetting(
      props.data["Settings"],
      "Travel Fee Per Kilometer"
    );
    const travelFeePerHour = getSetting(
      props.data["Settings"],
      "Travel Fee Per Hour"
    );
    const minimumDistance = getSetting(
      props.data["Settings"],
      "Minimum Distance"
    );
    let cost = 0;
    if (distance >= minimumDistance) {
      cost = distance * travelFeePerKm + time * travelFeePerHour;
      cost = 5 * Math.round(cost / 5);
    }
    return cost;
  };

  const setTravelDetails = (travelDetails: any) => {
    let eventCopy = _.cloneDeep(props.event);

    if (travelDetails) {
      eventCopy[EventKeys.Address] = travelDetails.address;
      eventCopy[EventKeys.LocationUrl] = travelDetails.locationUrl;
      eventCopy[EventKeys.TravelTime] = travelDetails.duration.text;
      eventCopy[EventKeys.Distance] = travelDetails.distance.text;
      eventCopy[EventKeys.TravelCost] = getTravelCost(
        travelDetails.distance.value,
        travelDetails.duration.value
      );
    } else {
      delete eventCopy[EventKeys.TravelTime];
      delete eventCopy[EventKeys.Distance];
      delete eventCopy[EventKeys.TravelCost];
    }

    if (_.isEqual(eventCopy, props.event)) {
      return;
    }
    props.setEvent(eventCopy);
  };

  return (
    <Section title="Location">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <SubSection title="City">
            <SelectDropdown
              value={props.event["City"]!}
              onChange={(e: any) => {
                setCity(e.target.value);
              }}
              menuItems={props.data["Cities"].map((c) => ({
                label: c.Name,
                value: c.key,
              }))}
            />
          </SubSection>
        </Grid>
        <Grid item>
          <SubSection title="Venue Address">
            <ChooseLocation
              setTravelDetails={setTravelDetails}
              city={
                props.data["Cities"].find(
                  (c) => c.key === props.event[EventKeys.City]!
                ).Name
              }
              address={props.event[EventKeys.Address] || ""}
            />
            <Typography variant="caption" style={{ paddingLeft: "1%" }}>
              If unsure of exact address, enter the nearest suburb
            </Typography>
          </SubSection>
        </Grid>
      </Grid>
    </Section>
  );
};
