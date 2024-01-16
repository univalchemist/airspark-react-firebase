import { STAGE_NAMES } from "../consts";
import Event from "./Event";
import Information from "./Information";
import Service from "./Service";
interface IProps {
  stage: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IProps) => {
  switch (Object.values(STAGE_NAMES)[props.stage]) {
    case STAGE_NAMES.SERVICE:
      return <Service />;
    case STAGE_NAMES.EVENT:
      return <Event />;
    case STAGE_NAMES.INFORMATION:
      return <Information />;
  }
  return <></>;
};
