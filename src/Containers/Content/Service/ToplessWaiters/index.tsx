import { Grid } from "@material-ui/core";
import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  findUnsureRightNowKey,
  getMinimumHoursForToplessWaiters,
  getSetting,
} from "../../../../utils/helpers";
import {
  DataKeys,
  IData,
  IServices,
  SERVICE_NAMES,
} from "../../../../utils/types";
import Section from "../../Section";
import SubSection from "../../SubSection";
import CheckList from "../Components/CheckList";
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

  useEffect(() => {
    setWidth(ref.current?.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);
  const addButler = () => {
    if (
      props.services[SERVICE_NAMES.ToplessWaiters]!.Number ===
      getSetting(
        props.data![DataKeys.ToplessWaitersSettings],
        "Maximum Butlers"
      )
    ) {
      return;
    }
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!.Number! += 1;
    props.setServices(servicesCopy);
  };
  const subtractButler = () => {
    if (props.services[SERVICE_NAMES.ToplessWaiters]!.Number === 1) {
      return;
    }
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!.Number! -= 1;
    props.setServices(servicesCopy);
  };
  const addHour = () => {
    if (
      props.services[SERVICE_NAMES.ToplessWaiters]!.Hours ===
      getSetting(props.data![DataKeys.ToplessWaitersSettings], "Maximum Hours")
    ) {
      return;
    }
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!.Hours! += 1;
    props.setServices(servicesCopy);
  };
  const subtractHour = () => {
    if (
      props.services[SERVICE_NAMES.ToplessWaiters]!.Hours ===
      getMinimumHoursForToplessWaiters(props.services)
    ) {
      return;
    }
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!.Hours! -= 1;
    props.setServices(servicesCopy);
  };
  const selectAttire = (attire: Attires) => {
    const servicesCopy = _.cloneDeep(props.services);
    if (attire === Attires.Trousers) {
      servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Bare Buns"] = false;
    } else {
      servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Bare Buns"] = true;
    }
    props.setServices(servicesCopy);
  };
  const addGame = (key: string, checked: boolean) => {
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"] = servicesCopy[
      SERVICE_NAMES.ToplessWaiters
    ]!["Games"].filter((g) => g !== findUnsureRightNowKey(props.data));
    if (checked) {
      servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"] = servicesCopy[
        SERVICE_NAMES.ToplessWaiters
      ]!["Games"].filter((k) => k !== key);
    } else {
      servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"].push(key);
    }
    // if (_.isEmpty(servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"])) {
    //   servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"] = [
    //     findUnsureRightNowKey(props.data),
    //   ];
    // }
    props.setServices(servicesCopy);
  };
  const clearGames = (key: string) => {
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.ToplessWaiters]!["Games"] = [key];
    props.setServices(servicesCopy);
  };
  let gamesList = props.data[DataKeys.ToplessWaitersGames].map((g) => {
    const checked = props.services[SERVICE_NAMES.ToplessWaiters]![
      "Games"
    ].includes(g.key);
    return {
      label: g.Name,
      checked,
      onChange: () => {
        if (g.Name.toLowerCase() !== "unsure right now") {
          addGame(g.key, checked);
        } else {
          clearGames(g.key);
        }
      },
      radio: g.Name.toLowerCase() === "unsure right now",
    };
  });
  return (
    <Section title={SERVICE_NAMES.ToplessWaiters}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <SubSection title="Number of Topless Waiters">
                <Counter
                  style={
                    width
                      ? {
                          width,
                        }
                      : {}
                  }
                  value={`${
                    props.services[SERVICE_NAMES.ToplessWaiters]?.Number
                  } Butler${
                    Number(
                      props.services[SERVICE_NAMES.ToplessWaiters]?.Number
                    ) > 1
                      ? "s"
                      : ""
                  }`}
                  onAdd={addButler}
                  onSubtract={subtractButler}
                  minimum={
                    props.services[SERVICE_NAMES.ToplessWaiters]!.Number === 1
                  }
                  maximum={
                    props.services[SERVICE_NAMES.ToplessWaiters]!.Number ===
                    getSetting(
                      props.data![DataKeys.ToplessWaitersSettings],
                      "Maximum Butlers"
                    )
                  }
                />
              </SubSection>
            </Grid>
            <Grid item>
              <SubSection title="Number of Hours">
                <Counter
                  style={
                    width
                      ? {
                          width,
                        }
                      : {}
                  }
                  maximum={
                    props.services[SERVICE_NAMES.ToplessWaiters]!.Hours ===
                    getSetting(
                      props.data![DataKeys.ToplessWaitersSettings],
                      "Maximum Hours"
                    )
                  }
                  minimum={
                    props.services[SERVICE_NAMES.ToplessWaiters]!.Hours ===
                    getMinimumHoursForToplessWaiters(props.services)
                  }
                  value={`${
                    props.services[SERVICE_NAMES.ToplessWaiters]?.Hours
                  } Hour${
                    Number(
                      props.services[SERVICE_NAMES.ToplessWaiters]?.Hours
                    ) > 1
                      ? "s"
                      : ""
                  }`}
                  onAdd={addHour}
                  onSubtract={subtractHour}
                />
              </SubSection>
            </Grid>
            <Grid item>
              <SubSection title="Butler Attire">
                <SelectItem
                  ref={ref}
                  choices={[
                    {
                      label: Attires.Trousers,
                      selected: !props.services[SERVICE_NAMES.ToplessWaiters]![
                        "Bare Buns"
                      ],
                      onClick: () => {
                        selectAttire(Attires.Trousers);
                      },
                    },
                    {
                      label: Attires.BareBuns,
                      selected: props.services[SERVICE_NAMES.ToplessWaiters]![
                        "Bare Buns"
                      ],
                      onClick: () => {
                        selectAttire(Attires.BareBuns);
                      },
                    },
                  ]}
                />
              </SubSection>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <SubSection title="Games">
            <CheckList choices={gamesList} />
          </SubSection>
        </Grid>
      </Grid>
    </Section>
  );
};
