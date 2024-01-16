import { functions, initializeApp as initializeFirebase } from "firebase";
import * as _ from "lodash";
import moment from "moment";
import { App } from "./actions";
import { RootState, store } from "./configureStore";
import { mobileCheck, roundTime } from "./helpers";
import {
  DataKeys,
  EventKeys,
  IAppState,
  IData,
  IEvent,
  IServices,
  SERVICE_NAMES
} from "./types";

initializeFirebase({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const IS_MOBILE = mobileCheck();

let defaultServiceConfigs: IServices;

const storeDataIfChanged = async (
  prevData: IData | null,
  newData: IData
): Promise<boolean> => {
  if (!_.isEqual(prevData, newData)) {
    await store.dispatch({
      type: App.Data,
      data: newData,
    });
    return true;
  }
  return false;
};

const getAndStoreData = () => {
  return functions()
    .httpsCallable("getData")()
    .then(async (res) => {
      res.data[DataKeys.LifeDrawingOptions] = res.data[
        DataKeys.LifeDrawingOptions
      ].map((o: any) => {
        delete o[SERVICE_NAMES.LifeDrawing];
        return o;
      });
      res.data[DataKeys.BodyPaintingOptions] = res.data[
        DataKeys.BodyPaintingOptions
      ].map((o: any) => {
        delete o[SERVICE_NAMES.BodyPainting];
        return o;
      });
      res.data[DataKeys.StrippersOptions] = res.data[
        DataKeys.StrippersOptions
      ].map((o: any) => {
        delete o[SERVICE_NAMES.Strippers];
        return o;
      });
      const prevData = (((await store.getState()) as RootState)
        .app as IAppState).data;
      return storeDataIfChanged(prevData, res.data);
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};

export const resetApp = async () => {
  const data = (((await store.getState()) as RootState).app as IAppState).data;
  await store.dispatch({
    type: App.Stage,
    data: 0,
  });
  await store.dispatch({
    type: App.Service,
    data: {},
  });
  await store.dispatch({
    type: App.Information,
    data: {},
  });
  await assignDefaultEventConfigs(data!);
};
const setAppLoaded = async () => {
  await store.dispatch({
    type: "Loading",
    data: false,
  });
};
const setEventConfig = (event: IEvent) => {
  return store.dispatch({
    type: App.Event,
    data: event,
  });
};

const createDefaultServiceConfigs = (data: IData) => {
  defaultServiceConfigs = {
    [SERVICE_NAMES.ToplessWaiters]: {
      Number: 1,
      "Bare Buns": true,
      Games: [],
      Hours: 2,
    },
    [SERVICE_NAMES.LifeDrawing]: {
      Option: data![DataKeys.LifeDrawingOptions]?.[1]?.key,
    },

    [SERVICE_NAMES.BodyPainting]: {
      Option: data![DataKeys.BodyPaintingOptions]?.[1]?.key,
      Guests: 10,
    },
    [SERVICE_NAMES.Strippers]: {
      Option: data![DataKeys.StrippersOptions]?.[0]?.key,
    },
  };
};
const assignDefaultEventConfigs = async (data: IData) => {
  const defaultEventConfigs = {
    [EventKeys.City]: data["Cities"]?.[0]?.key,
    [EventKeys.EventDate]: roundTime(moment()).toISOString(),
  };
  return setEventConfig(defaultEventConfigs);
};

const initializeApp = async () => {
  // Check if backend data was changed
  const isNewDataFetched = await getAndStoreData();
  const data = (((await store.getState()) as RootState).app as IAppState).data;
  createDefaultServiceConfigs(data!);

  if (isNewDataFetched) {
    await resetApp();
  }
  setAppLoaded();
};
initializeApp();
export { defaultServiceConfigs };
