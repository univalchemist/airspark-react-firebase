import * as _ from "lodash";
import React from "react";
import {
  DataKeys,
  IData,
  IServices,
  SERVICE_NAMES,
} from "../../../../utils/types";
import Section from "../../Section";
import SubSection from "../../SubSection";
import SelectItem from "../Components/SelectItem";

export interface IProps {
  data: IData;
  services: IServices;
  setServices: (services: IServices) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  const selectOption = (option: string) => {
    const servicesCopy = _.cloneDeep(props.services);
    servicesCopy[SERVICE_NAMES.Strippers]!["Option"] = option;
    props.setServices(servicesCopy);
  };
  return (
    <Section title={SERVICE_NAMES.Strippers}>
      <SubSection title="Stripper Option" noMobileView>
        <SelectItem
          choices={props.data[DataKeys.StrippersOptions].map((o) => ({
            label: o.Name,
            selected:
              props.services[SERVICE_NAMES.Strippers]!["Option"] === o.key,
            onClick: () => {
              selectOption(o.key);
            },
          }))}
        />
      </SubSection>
    </Section>
  );
};
