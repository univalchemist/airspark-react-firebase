import { Grid, TextField, TextFieldProps, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { KeyboardDatePicker } from "@material-ui/pickers";
import _ from "lodash";
import moment, { Moment } from "moment";
import React from "react";
import TextInput from "../../../Components/TextInput";
import { roundTime } from "../../../utils/helpers";
import { EventKeys, IData, IEvent } from "../../../utils/types";
import Section from "../Section";
import SubSection from "../SubSection";

interface IProps {
  data: IData;
  event: IEvent;
  setEvent: (event: IEvent) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  const setDate = (date: Moment) => {
    let eventCopy = _.cloneDeep(props.event);
    eventCopy[EventKeys.EventDate] = roundTime(date).toISOString();
    if (_.isEqual(eventCopy, props.event)) {
      return;
    }
    props.setEvent(eventCopy);
  };
  const setDetails = (details: string) => {
    let eventCopy = _.cloneDeep(props.event);
    eventCopy[EventKeys.Details] = details;
    if (_.isEqual(eventCopy, props.event)) {
      return;
    }
    props.setEvent(eventCopy);
  };

  const timelineLabels = () => {
    const interval = 15;
    const period = "minutes";
    const periodsInADay = moment.duration(1, "day").as(period);
    const timeLabels = [];
    const startTimeMoment = moment("00:00", "hh:mm");
    for (let i = 0; i <= periodsInADay; i += interval) {
      startTimeMoment.add(i === 0 ? 0 : interval, period);
      timeLabels.push({
        value: startTimeMoment.toISOString(),
        label: startTimeMoment.format("h:mm a"),
      });
    }

    return timeLabels;
  };

  return (
    <Section title="Itinerary">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SubSection title="Event Date">
                <KeyboardDatePicker
                  color="secondary"
                  format="dd MMMM yyyy"
                  fullWidth
                  inputVariant="outlined"
                  size="small"
                  KeyboardButtonProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  keyboardIcon={<CalendarTodayIcon color="primary" />}
                  value={moment(props.event[EventKeys.EventDate])}
                  onChange={(date) => setDate(moment(date))}
                />
              </SubSection>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SubSection title="Butler Arrival Time">
                {/* <KeyboardTimePicker
                  color="secondary"
                  fullWidth
                  size="small"
                  minutesStep={15}
                  KeyboardButtonProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  inputVariant="outlined"
                  keyboardIcon={<AccessTimeIcon color="primary" />}
                /> */}

                <Autocomplete
                  options={timelineLabels()}
                  value={{
                    value: moment(
                      props.event[EventKeys.EventDate]
                    ).toISOString(),
                    label: moment(props.event[EventKeys.EventDate]).format(
                      "h:mm a"
                    ),
                  }}
                  onChange={(e, date) => {
                    setDate(
                      moment(props.event[EventKeys.EventDate])
                        .set("hour", moment(date.value).get("hour"))
                        .set("minute", moment(date.value).get("minute"))
                    );
                  }}
                  autoHighlight
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  renderOption={(option: any) => (
                    <React.Fragment>
                      <span>{option.label}</span>
                    </React.Fragment>
                  )}
                  disableClearable
                  popupIcon={<AccessTimeIcon color="primary" />}
                  renderInput={(params: TextFieldProps) => (
                    <TextField {...params} size="small" variant="outlined" />
                  )}
                />
                {/* <Typography variant="caption" style={caption}>
                  * Time isn't confirmed yet
                </Typography> */}
              </SubSection>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <SubSection title="Further Details">
            <TextInput
              placeholder="What kind of party are you having? Are you flexible on timing?"
              multiline
              value={props.event[EventKeys.Details]}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />

            <Typography variant="caption" style={{ paddingLeft: "0.5%" }}>
              Your Butler/s will see this in the booking notes
            </Typography>
          </SubSection>
        </Grid>
      </Grid>
    </Section>
  );
};
