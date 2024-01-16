import { Grid, Typography } from "@material-ui/core";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { App } from "../../../utils/actions";
import { RootState } from "../../../utils/configureStore";
import { defaultServiceConfigs, IS_MOBILE } from "../../../utils/fb";
import { getMinimumHoursForToplessWaiters } from "../../../utils/helpers";
import { IAppState, IServices, SERVICE_NAMES } from "../../../utils/types";
import Section from "../Section";
import CheckList from "./Components/CheckList";
import { description as descriptionStyle } from "./styles";

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

const isServiceSelected = (services: IServices, name: string) => {
  return name in services;
};

const addNewService = (services: IServices, name: string): IServices => {
  return Object.assign({ [name]: defaultServiceConfigs[name] }, services);
};

// eslint-disable-next-line import/no-anonymous-default-export
const MyComponent = (props: Props) => {
  const [description, setDescription] = useState<string | undefined>(undefined);
  const getDescription = (selectedServices: any): string | undefined => {
    if (_.isEmpty(selectedServices)) {
      return undefined;
    }
    const sortedSelectedServiceKeys = selectedServices
      .map((s: any) => s.key)
      .sort();
    return props.data!["Descriptions"].find((d) =>
      _.isEqual(d.Services, sortedSelectedServiceKeys)
    )?.Description;
  };
  const addOrRemoveServices = (s: any) => {
    if (isServiceSelected(props.services, s.Name)) {
      const servicesCopy = { ...props.services };
      delete servicesCopy[s.Name];
      props.setServices(servicesCopy);
    } else {
      props.setServices(addNewService(props.services, s.Name));
    }
  };

  const checkAndSetMinimumHours = () => {
    const minimumHours = getMinimumHoursForToplessWaiters(props.services);
    if (props.services[SERVICE_NAMES.ToplessWaiters]!.Hours < minimumHours) {
      const servicesCopy = _.cloneDeep(props.services);
      servicesCopy[SERVICE_NAMES.ToplessWaiters]!.Hours! = minimumHours;
      props.setServices(servicesCopy);
    }
  };
  useEffect(() => {
    setDescription(
      getDescription(
        props.data!["Services"].filter((s) => s.Name in props.services)
      )
    );
    if (SERVICE_NAMES.ToplessWaiters in props.services) {
      checkAndSetMinimumHours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.services]);
  return (
    <Section title="Services">
      <Grid container direction="column" spacing={1}>
        {!IS_MOBILE && (
          <Grid item>
            <Typography variant="body1">
              Chosen Service (select multiple for combos)
            </Typography>
          </Grid>
        )}
        <Grid item>
          <CheckList
            choices={props.data!.Services.map((s: any) => ({
              label: s.Name,
              checked: isServiceSelected(props.services, s.Name),
              onChange: () => addOrRemoveServices(s),
            }))}
          />
        </Grid>
        {description && (
          <Grid item>
            <div
              style={descriptionStyle}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Grid>
        )}
      </Grid>
    </Section>
  );
};

export default connector(MyComponent);
