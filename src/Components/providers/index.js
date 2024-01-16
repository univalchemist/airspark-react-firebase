import React from "react";
import PersistGateProvider from "./persistGate";
import ReduxProvider from "./redux";
import RouterProvider from "./router";
import ThemeProvider from "./theme";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => (
  <ReduxProvider>
    <PersistGateProvider>
      <ThemeProvider>
        <RouterProvider>{children}</RouterProvider>
      </ThemeProvider>
    </PersistGateProvider>
  </ReduxProvider>
);
