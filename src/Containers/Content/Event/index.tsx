import { Grid } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { App } from "../../../utils/actions";
import { RootState } from "../../../utils/configureStore";
import { IAppState, IEvent } from "../../../utils/types";
import Itinerary from "./Itinerary";
import Location from "./Location";
import Travel from "./Travel";

const mapState = (state: RootState) => ({
  data: (state.app as IAppState).data,
  event: (state.app as IAppState).event,
});

const mapDispatch = {
  setEvent: (event: IEvent) => ({ type: App.Event, data: event }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

// eslint-disable-next-line import/no-anonymous-default-export
const MyComponent = (props: Props) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Location
          data={props.data!}
          event={props.event}
          setEvent={props.setEvent}
        />
      </Grid>
      <Grid item>
        <Travel event={props.event} />
      </Grid>
      <Grid item>
        <Itinerary
          data={props.data!}
          event={props.event}
          setEvent={props.setEvent}
        />
      </Grid>
    </Grid>
  );
};
export default connector(MyComponent);
