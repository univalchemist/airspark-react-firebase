import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import Loading from "../Loading";
import { persistor } from "./../../utils/configureStore";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => (
  <PersistGate loading={<Loading />} persistor={persistor}>
    {children}
  </PersistGate>
);
