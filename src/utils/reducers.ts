// reducers.js
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { App } from "./actions";
import { IAppState, IData, IEvent, IInformation, IServices } from "./types";

export const defaultAppState: any = {
  stage: 0,
  services: {},
  event: {},
  information: {},
  subtotal: 0,
};

const app = (
  state: IAppState = {
    data: null,
    ...defaultAppState,
  },
  action: {
    type: App;
    data: IData | null | number | IServices | IEvent | IInformation;
  }
) => {
  switch (action.type) {
    case App.Data:
      return { ...state, data: action.data };
    case App.Stage:
      return { ...state, stage: action.data };
    case App.Event:
      return { ...state, event: action.data };
    case App.Service:
      return { ...state, services: action.data };
    case App.Information:
      return { ...state, information: action.data };
    case App.Subtotal:
      return { ...state, subtotal: action.data };
    default:
      return state;
  }
};

const loading = (
  state = {
    loading: true,
  },
  action: any
) => {
  switch (action.type) {
    case "Loading":
      return { ...state, loading: action.data };
    default:
      return state;
  }
};

export const createRootReducer = (history: any) =>
  combineReducers({
    app,
    loading,
    router: connectRouter(history),
  });
