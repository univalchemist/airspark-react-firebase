import { Typography } from "@material-ui/core";
import * as _ from "lodash";
import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { App } from "../../utils/actions";
import { RootState } from "../../utils/configureStore";
import { getSetting } from "../../utils/helpers";
import {
  DataKeys,
  EventKeys,
  IAppState,
  IServices,
  SERVICE_NAMES,
} from "../../utils/types";
import { subtotal as subtotalStyle } from "./styles";

const mapState = (state: RootState) => ({
  subtotal: (state.app as IAppState).subtotal,
  services: (state.app as IAppState).services,
  event: (state.app as IAppState).event,
  data: (state.app as IAppState).data,
  stage: (state.app as IAppState).stage,
});

const mapDispatch = {
  setSubtotal: (subtotal: number) => ({ type: App.Subtotal, data: subtotal }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function round5(x: number): number {
  return Math.ceil(x / 5) * 5;
}

const checkComboPricing = (
  servicesToCheck: Array<string>,
  services: IServices
): boolean =>
  !_.isEmpty(_.intersection(servicesToCheck, Object.keys(services)));

const MyComponent = (props: Props) => {
  const calculateBodyPainting = (): number => {
    if (!(SERVICE_NAMES.BodyPainting in props.services)) {
      return 0;
    }
    const chosenOption = props.data![DataKeys.BodyPaintingOptions].find(
      (b) => b.key === props.services[SERVICE_NAMES.BodyPainting]!["Option"]
    );
    const bodyPaintingSettings = props.data![DataKeys.BodyPaintingSettings];

    const basePrice = chosenOption["Price"];
    const minimumGuests = getSetting(bodyPaintingSettings, "Minimum Guests");
    const maximumGuests = getSetting(bodyPaintingSettings, "Maximum Guests");
    const priceModifier = getSetting(bodyPaintingSettings, "Price Modifier");
    const steps = getSetting(bodyPaintingSettings, "Steps");

    let guests = props.services[SERVICE_NAMES.BodyPainting]!["Guests"];

    if (guests < minimumGuests) {
      guests = minimumGuests;
    } else if (guests > maximumGuests) {
      guests = maximumGuests;
    }

    let tempGuests;
    let finalPrice = basePrice;
    let tempPriceModifier = priceModifier;
    for (tempGuests = minimumGuests + 1; tempGuests <= guests; tempGuests++) {
      finalPrice = round5(finalPrice + (tempPriceModifier / 100) * finalPrice);
      tempPriceModifier += steps;
    }
    return finalPrice;
  };

  const calculateLifeDrawing = (): number => {
    if (!(SERVICE_NAMES.LifeDrawing in props.services)) {
      return 0;
    }
    const comboPricing = checkComboPricing(
      [SERVICE_NAMES.BodyPainting],
      props.services
    );
    const chosenOption = props.data![DataKeys.LifeDrawingOptions].find(
      (b) => b.key === props.services[SERVICE_NAMES.LifeDrawing]!["Option"]
    );
    if (comboPricing) {
      return chosenOption["Combo Price"];
    } else {
      return chosenOption["Standard Price"];
    }
  };

  const calculateToplessWaiters = (): number => {
    if (!(SERVICE_NAMES.ToplessWaiters in props.services)) {
      return 0;
    }

    const comboPricing = checkComboPricing(
      [SERVICE_NAMES.BodyPainting, SERVICE_NAMES.LifeDrawing],
      props.services
    );
    const toplessWaitersSettings = props.data![DataKeys.ToplessWaitersSettings];

    const basePrice = comboPricing
      ? getSetting(toplessWaitersSettings, "Combo Price")
      : getSetting(toplessWaitersSettings, "Base Price");
    const priceModifier = comboPricing
      ? getSetting(toplessWaitersSettings, "Combo Price Modifier")
      : getSetting(toplessWaitersSettings, "Price Modifier");
    const steps = getSetting(toplessWaitersSettings, "Steps");
    const bareBunsAdditionalPrice = getSetting(
      toplessWaitersSettings,
      "Bare Buns Additional Price"
    );
    const hoursPriceModifier = getSetting(
      toplessWaitersSettings,
      "Hours Price Modifier"
    );

    const bareBuns: boolean = props.services[SERVICE_NAMES.ToplessWaiters]![
      "Bare Buns"
    ];
    let butlers = props.services[SERVICE_NAMES.ToplessWaiters]!["Number"];

    let tempButlers;
    let finalPrice = basePrice;
    let tempPriceModifier = priceModifier;
    for (tempButlers = 2; tempButlers <= butlers; tempButlers++) {
      finalPrice = round5(
        tempButlers * basePrice - (tempPriceModifier / 100) * finalPrice
      );
      tempPriceModifier += steps;
    }
    if (bareBuns) {
      finalPrice += bareBunsAdditionalPrice * butlers;
    }

    let hours = props.services[SERVICE_NAMES.ToplessWaiters]!["Hours"];
    if (hours > 1) {
      let hourPricing = 2;
      for (let tempHours = 2; tempHours < hours; tempHours++) {
        hourPricing += hoursPriceModifier;
      }
      finalPrice *= hourPricing;
      finalPrice = round5(finalPrice);
    }
    return finalPrice;
  };

  const calculateStrippers = (): number => {
    if (!(SERVICE_NAMES.Strippers in props.services)) {
      return 0;
    }
    const comboPricing = checkComboPricing(
      [
        SERVICE_NAMES.BodyPainting,
        SERVICE_NAMES.LifeDrawing,
        SERVICE_NAMES.ToplessWaiters,
      ],
      props.services
    );
    const chosenOption = props.data![DataKeys.StrippersOptions].find(
      (b) => b.key === props.services[SERVICE_NAMES.Strippers]!["Option"]
    );
    if (comboPricing) {
      return chosenOption["Combo Price"];
    } else {
      return chosenOption["Standard Price"];
    }
  };

  const calculateSubtotal = (): number => {
    return (
      calculateBodyPainting() +
      calculateLifeDrawing() +
      calculateToplessWaiters() +
      calculateStrippers()
    );
  };

  useEffect(() => {
    const subtotal = calculateSubtotal();
    if (props.subtotal !== subtotal) {
      props.setSubtotal(subtotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.services, props.data]);
  return (
    <Typography variant="h6" style={subtotalStyle}>
      {props.stage === 0 && "SUB-"}TOTAL $
      {props.subtotal + (props.event[EventKeys.TravelCost] || 0)}
    </Typography>
  );
};

export default connector(MyComponent);
