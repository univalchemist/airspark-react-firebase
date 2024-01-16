import { Button, ButtonProps, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { functions } from "firebase";
import _ from "lodash";
import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import Loading from "../../Components/Loading";
import { RootState } from "../../utils/configureStore";
import { IS_MOBILE } from "../../utils/fb";
import { validateEmail } from "../../utils/helpers";
import {
  DataKeys,
  EventKeys,
  IAppState,
  IEvent,
  IInformation,
  InformationKeys,
  SERVICE_NAMES,
} from "../../utils/types";
import { STAGE_NAMES } from "../consts";
import { getServiceDetails } from "../Content/Information/helpers";
import AlertModal from "./AlertModal";
import { transformInformation } from "./helpers";
import {
  backwardButtonIcon,
  button,
  containerBody,
  containerBodyMobile,
  disabledForwardButtonIcon,
  forwardButtonIcon,
  subtotalContainer,
} from "./styles";
import SubTotal from "./SubTotal";

const mapState = (state: RootState) => ({
  information: (state.app as IAppState).information,
  services: (state.app as IAppState).services,
  event: (state.app as IAppState).event,
  subtotal: (state.app as IAppState).subtotal,
  data: (state.app as IAppState).data,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  stage: number;
  setStage: (arg0: number) => void;
}
type Props = PropsFromRedux & IProps;

const checkEventDetails = (event: IEvent): boolean => {
  const requiredFields = [
    EventKeys.EventDate,
    EventKeys.City,
    EventKeys.Address,
    EventKeys.LocationUrl,
    EventKeys.TravelTime,
    EventKeys.Distance,
  ];
  for (let key of requiredFields) {
    if (!event[key]) {
      return false;
    }
  }
  if (event[EventKeys.TravelCost] === undefined) {
    return false;
  }
  return true;
};

const checkInformationDetails = (information: IInformation): boolean => {
  const requiredFields = [
    InformationKeys.FirstName,
    InformationKeys.LastName,
    InformationKeys.Email,
    InformationKeys.PhoneNumber,
  ];
  for (let key of requiredFields) {
    if (!information[key]) {
      return false;
    }
  }
  if (!validateEmail(information[InformationKeys.Email]!)) {
    return false;
  }
  return true;
};
export enum StatusStates {
  Waiting,
  Booked,
  Error,
}
interface Status {
  status: StatusStates;
  message: string;
  onOkay?: () => void;
}
const MyComponent = (props: Props) => {
  const [status, setStatus] = useState<Status>({
    status: StatusStates.Waiting,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const bookServices = () => {
    setLoading(true);
    return functions()
      .httpsCallable("bookServices")({
        services: props.services,
        event: props.event,
        information: {
          ...transformInformation(props.information),
          Description: getServiceDetails(props.services, props.data!),
          Games: props
            .data![DataKeys.ToplessWaitersGames]?.filter((g) =>
              props.services[SERVICE_NAMES.ToplessWaiters]?.Games.includes(
                g.key
              )
            )
            .map((g) => g.Name)
            .join(", "),
        },
        finalPrice: props.subtotal,
      })
      .then((res) => {
        window.location.replace(
          "https://www.barebutlers.co.nz/booking-confirmation/"
        );
      })
      .catch(() => {
        setStatus({
          status: StatusStates.Error,
          message:
            "There was an error in your booking. Please reload the page and try again",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getButtonsFromStage = (): Array<ButtonProps> => {
    const stageName = Object.values(STAGE_NAMES)[props.stage];
    let disabled = false;
    switch (stageName) {
      case STAGE_NAMES.SERVICE:
        disabled = Boolean(
          _.isEmpty(props.services) ||
            (props.services[SERVICE_NAMES.ToplessWaiters] &&
              _.isEmpty(props.services[SERVICE_NAMES.ToplessWaiters]?.Games))
        );
        return [
          {
            children: "NEXT STEP",
            onClick: () => props.setStage(1),
            disabled,
            variant: "contained",
            endIcon: (
              <ArrowForwardIcon
                style={disabled ? disabledForwardButtonIcon : forwardButtonIcon}
                fontSize={"small"}
              />
            ),
          },
        ];
      case STAGE_NAMES.EVENT:
        disabled = !checkEventDetails(props.event);
        return [
          {
            children: "PREVIOUS",
            onClick: () => props.setStage(0),
            variant: "outlined",
            startIcon: (
              <ArrowBackIcon style={backwardButtonIcon} fontSize={"small"} />
            ),
          },
          {
            children: "NEXT STEP",
            onClick: () => props.setStage(2),
            disabled,
            variant: "contained",
            endIcon: (
              <ArrowForwardIcon
                style={disabled ? disabledForwardButtonIcon : forwardButtonIcon}
                fontSize={"small"}
              />
            ),
          },
        ];
      case STAGE_NAMES.INFORMATION:
        return [
          {
            children: "PREVIOUS",
            onClick: () => props.setStage(1),
            variant: "outlined",
            startIcon: (
              <ArrowBackIcon style={backwardButtonIcon} fontSize={"small"} />
            ),
          },
          {
            children: "SUBMIT",
            disabled: !checkInformationDetails(props.information),
            onClick: bookServices,
            variant: "contained",
          },
        ];
    }
    return [];
  };

  const Buttons = () => (
    <Grid container spacing={!IS_MOBILE ? 2 : 0}>
      {getButtonsFromStage().map((b: ButtonProps, i: number) => (
        <Grid item key={i}>
          <Button
            style={{
              ...button,
              ...(IS_MOBILE
                ? {
                    marginRight: 5,
                  }
                : {}),
            }}
            disableElevation
            color="primary"
            size="large"
            {...b}
          />
        </Grid>
      ))}
    </Grid>
  );
  const RenderFooter = () => {
    if (IS_MOBILE) {
      return (
        <>
          <div style={{ ...containerBody, ...subtotalContainer }}>
            <SubTotal />
          </div>
          <Grid
            container
            alignItems="center"
            direction="column"
            style={containerBodyMobile}
          >
            <Grid item>
              <Buttons />
            </Grid>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <br />
          <Grid container style={containerBody} justify="space-between">
            <Grid item>
              <SubTotal />
            </Grid>
            <Grid item>
              <Buttons />
            </Grid>
          </Grid>
        </>
      );
    }
  };
  return (
    <>
      {loading && <Loading />}
      {status.status !== StatusStates.Waiting && (
        <AlertModal
          error={status.status === StatusStates.Error}
          message={status.message}
          setStatus={setStatus}
          onOkay={status.onOkay}
        />
      )}
      <RenderFooter />
    </>
  );
};

export default connector(MyComponent);
