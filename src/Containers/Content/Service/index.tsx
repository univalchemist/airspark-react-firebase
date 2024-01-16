import { Grid } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { App } from "../../../utils/actions";
import { RootState } from "../../../utils/configureStore";
import { IAppState, IServices, SERVICE_NAMES } from "../../../utils/types";
import BodyPainting from "./BodyPainting";
import LifeDrawing from "./LifeDrawing";
import SelectServices from "./SelectServices";
import Strippers from "./Strippers";
import ToplessWaiters from "./ToplessWaiters";

const mapState = (state: RootState) => ({
  data: (state.app as IAppState).data,
  services: (state.app as IAppState).services,
});

const mapDispatch = {
  setServices: (services: IServices) => ({ type: App.Service, data: services }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

// eslint-disable-next-line import/no-anonymous-default-export
const MyComponent = (props: Props) => {
  const renderServiceOptions = (serviceName: SERVICE_NAMES) => {
    switch (serviceName) {
      case SERVICE_NAMES.BodyPainting:
        return (
          <BodyPainting
            services={props.services}
            data={props.data!}
            setServices={props.setServices}
          />
        );
      case SERVICE_NAMES.LifeDrawing:
        return (
          <LifeDrawing
            services={props.services}
            data={props.data!}
            setServices={props.setServices}
          />
        );
      case SERVICE_NAMES.ToplessWaiters:
        return (
          <ToplessWaiters
            services={props.services}
            data={props.data!}
            setServices={props.setServices}
          />
        );
      case SERVICE_NAMES.Strippers:
        return (
          <Strippers
            services={props.services}
            data={props.data!}
            setServices={props.setServices}
          />
        );
    }
    return <></>;
  };
  return (
    <>
      <br />
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <SelectServices />
        </Grid>
        {props
          .data!["Services"].filter((s) => s.Name in props.services)
          .map((k, i) => (
            <Grid item key={i}>
              {renderServiceOptions(k.Name as SERVICE_NAMES)}
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default connector(MyComponent);
