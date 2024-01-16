import { Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import TextInput from "../../../Components/TextInput";
import { App } from "../../../utils/actions";
import { RootState } from "../../../utils/configureStore";
import {
  DataKeys,
  EventKeys,
  IAppState,
  IInformation,
  InformationKeys,
  IServices,
  SERVICE_NAMES,
} from "../../../utils/types";
import Section from "../Section";
import { getServiceDetails } from "./helpers";
import { bookingDetails as bookingDetailsStyle } from "./styles";

const mapState = (state: RootState) => ({
  information: (state.app as IAppState).information,
  event: (state.app as IAppState).event,
  services: (state.app as IAppState).services,
  data: (state.app as IAppState).data,
  subtotal: (state.app as IAppState).subtotal,
});

const mapDispatch = {
  setInformation: (information: IInformation) => ({
    type: App.Information,
    data: information,
  }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
type BookingDetailsProps = {
  question: string;
  answer: string;
};

const BookingDetailGrid = (props: BookingDetailsProps) => {
  return (
    <div style={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <b>{props.question}:</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            overflowWrap: "anywhere",
            whiteSpace: "pre-line",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">{props.answer}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const getEndTime = (startTime: string, services: IServices) => {
  let hours = 0;
  if (SERVICE_NAMES.ToplessWaiters in services) {
    hours += services[SERVICE_NAMES.ToplessWaiters]!.Hours;
  }
  if (SERVICE_NAMES.LifeDrawing in services) {
    hours += 1;
  }
  if (SERVICE_NAMES.BodyPainting in services) {
    hours += 1;
  }
  if (SERVICE_NAMES.Strippers in services) {
    hours += 0.5;
  }

  return moment(startTime).add(hours, "hours");
};

// eslint-disable-next-line import/no-anonymous-default-export
const MyComponent = (props: Props) => {
  const bookingDetails: Array<BookingDetailsProps> = [
    {
      question: "Date",
      answer: moment(props.event[EventKeys.EventDate]).format("D MMMM YYYY"),
    },
    {
      question: "Time",
      answer: `${moment(props.event[EventKeys.EventDate]).format(
        "h:mm a"
      )} - ${moment(
        getEndTime(props.event[EventKeys.EventDate]!, props.services)
      ).format("h:mm a")}`,
    },
    {
      question: "Address",
      answer: props.event[EventKeys.Address]?.replace(", New Zealand", "")!,
    },
    {
      question: "Service",
      answer: getServiceDetails(props.services, props.data!),
    },
    {
      question: "Booking Fee",
      answer: "$" + String(props.subtotal),
    },
    {
      question: "Travel Fee",
      answer: props.event[EventKeys.TravelCost]
        ? "$" + String(props.event[EventKeys.TravelCost]) + " cash"
        : "No travel fee",
    },
  ];
  if (SERVICE_NAMES.ToplessWaiters in props.services) {
    bookingDetails.splice(4, 0, {
      question: "Games",
      answer: props
        .data![DataKeys.ToplessWaitersGames].filter((g) =>
          props.services[SERVICE_NAMES.ToplessWaiters]!.Games.includes(g.key)
        )
        .map((g) => g.Name)
        .join(", "),
    });
  }
  if (props.event[EventKeys.Details]) {
    bookingDetails.push({
      question: "Details",
      answer: props.event[EventKeys.Details]!,
    });
  }
  const setValue = (key: InformationKeys, value: string) => {
    let informationCopy = _.cloneDeep(props.information);
    informationCopy[key] = value;
    if (_.isEqual(informationCopy, props.information)) {
      return;
    }
    props.setInformation(informationCopy);
  };
  return (
    <Grid container direction="column" spacing={2} wrap="nowrap">
      <Grid item>
        <Section title="Name">
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <TextInput
                style={{ width: "98%" }}
                placeholder="First Name"
                value={props.information[InformationKeys.FirstName]}
                onChange={(e) =>
                  setValue(InformationKeys.FirstName, e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} style={{ position: "relative" }}>
              <TextInput
                style={{ width: "98%", position: "absolute", right: 0 }}
                placeholder="Last Name"
                value={props.information[InformationKeys.LastName]}
                onChange={(e) =>
                  setValue(InformationKeys.LastName, e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Section>
      </Grid>
      <Grid item>
        <Section title="Contact Details">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextInput
                placeholder="Email"
                value={props.information[InformationKeys.Email]}
                onChange={(e) =>
                  setValue(InformationKeys.Email, e.target.value)
                }
              />
            </Grid>
            <Grid item>
              <TextInput
                placeholder="Phone Number"
                value={props.information[InformationKeys.PhoneNumber]}
                onChange={(e) =>
                  setValue(InformationKeys.PhoneNumber, e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Section>
      </Grid>
      <Grid item>
        <Section title="Message">
          <TextInput
            placeholder="Anything else we should know? Any questions?"
            multiline
            rows={3}
            value={props.information[InformationKeys.Message]}
            onChange={(e) => setValue(InformationKeys.Message, e.target.value)}
          />
          {/* <Typography style={endText} color="primary">
            When you submit your booking, you will shortly receive a booking
            confirmation email, and and invoice for online payment of the
            booking fee.
          </Typography> */}
        </Section>
      </Grid>
      <Grid item>
        <Section title="Booking Details">
          {/* <Grid container direction="column" > */}
          <div style={bookingDetailsStyle}>
            {bookingDetails.map((bd, i) => (
              <BookingDetailGrid {...bd} key={i} />
            ))}
          </div>
          {/* </Grid> */}
        </Section>
      </Grid>
    </Grid>
  );
};
export default connector(MyComponent);
