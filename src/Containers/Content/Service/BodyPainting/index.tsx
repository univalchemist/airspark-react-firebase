import { Grid } from "@material-ui/core";
import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  DataKeys,
  IData,
  IServices,
  SERVICE_NAMES,
} from "../../../../utils/types";
import Section from "../../Section";
import SubSection from "../../SubSection";
import Counter from "../Components/Counter";
import SelectItem from "../Components/SelectItem";

export enum Attires {
  Trousers = "Trousers",
  BareBuns = "Bare Buns",
}

export interface IProps {
  data: IData;
  services: IServices;
  setServices: (services: IServices) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  const ref = useRef<any>(null);
  const [width, setWidth] = useState(undefined);
  const addGuest = () => {
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.BodyPainting]!.Guests! += 1;
    props.setServices(servicesCopy);
  };
  const subtractGuest = () => {
    if (props.services[SERVICE_NAMES.BodyPainting]!.Guests === 1) {
      return;
    }
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.BodyPainting]!.Guests! -= 1;
    props.setServices(servicesCopy);
  };
  const selectOption = (option: string) => {
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.BodyPainting]!["Option"] = option;
    props.setServices(servicesCopy);
  };
  useEffect(() => {
    setWidth(ref.current?.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <Section title={SERVICE_NAMES.BodyPainting}>
      <Grid container spacing={1}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <SubSection title="Body Painting Option" noMobileView>
            <SelectItem
              ref={ref}
              choices={props.data[DataKeys.BodyPaintingOptions].map((o) => ({
                label: o.Name,
                selected:
                  props.services[SERVICE_NAMES.BodyPainting]!["Option"] ===
                  o.key,
                onClick: () => {
                  selectOption(o.key);
                },
              }))}
            />
          </SubSection>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <SubSection title="Number of Guests">
            <Counter
              style={
                width
                  ? {
                      width,
                    }
                  : {}
              }
              value={`${
                props.services[SERVICE_NAMES.BodyPainting]?.Guests
              } Guests`}
              minimum={props.services[SERVICE_NAMES.BodyPainting]!.Guests === 1}
              onAdd={addGuest}
              onSubtract={subtractGuest}
            />
          </SubSection>
        </Grid>
      </Grid>
    </Section>
  );
};
