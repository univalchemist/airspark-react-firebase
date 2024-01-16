import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { ThemeProvider } from "styled-components";
import { mainColor, secondaryColor } from "./consts";

const makeMuiTheme = (themeLight, color) =>
  responsiveFontSizes(
    createMuiTheme({
      props: {
        MuiButtonBase: {
          disableRipple: true, // No ripples
        },
      },
      palette: {
        type: themeLight ? "light" : "dark",
        primary: {
          main: color?.primary || mainColor,
        },
        secondary: {
          main: secondaryColor,
          light: secondaryColor,
        },
      },
      shape: {
        // borderRadius: 7,
      },
      typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
      },
    })
  );

const isInWebAppiOS = window.navigator.standalone === true;
// const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    if (isInWebAppiOS) {
      return true;
    }
  }
  return false;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, color }) => (
  <MuiThemeProvider theme={makeMuiTheme(true, { main: mainColor })}>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider
        theme={{
          isIos: isIos(),
        }}
      >
        {children}
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);
