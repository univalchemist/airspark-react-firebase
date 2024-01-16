import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Loading from "../Components/Loading";
import logo from "../logo.png";
import { App } from "../utils/actions";
import { RootState } from "../utils/configureStore";
import { IS_MOBILE } from "../utils/fb";
import { IAppState } from "../utils/types";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { body, gridBody } from "./styles";

const mapState = (state: RootState) => ({
  stage: (state.app as IAppState).stage,
  loading: state.loading.loading,
});

const mapDispatch = {
  setStage: (stage: number) => ({ type: App.Stage, data: stage }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const MyComponent = (props: Props) => {
  const theme = useTheme();

  const matchesTablet = useMediaQuery(theme.breakpoints.down("md"));
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));

  if (props.loading) {
    return <Loading />;
  }
  // let containerBodyStyle = body;
  // if (matches || window != window.top) {
  //   containerBodyStyle = {
  //     ...containerBodyStyle,
  //     padding: 0,
  //   };
  // }
  return (
    <div
      style={{
        background: "#EFEFEF",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!matchesTablet && (
        <>
          <br />
          <Grid
            container
            style={{ width: "100%" }}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={2} style={{ paddingLeft: 20 }}>
              <a href="https://www.barebutlers.co.nz/">
                <img src={logo} height={100} />
              </a>
            </Grid>
            <Grid
              item
              xs={8}
              style={{ display: "grid", justifyContent: "center" }}
            >
              <div
                style={{
                  color: "#F3117A",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 90,
                  fontWeight: 1500,
                  lineHeight: "0.8em",
                  letterSpacing: "-0.3px",
                }}
              >
                BOOK NOW
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <br />
        </>
      )}
      <Grid container style={body} justify="center">
        <Grid item style={{ maxWidth: 900 }}>
          <Grid container spacing={2}>
            <Grid item style={{ ...gridBody, padding: 0 }}>
              <Header stage={props.stage} />
            </Grid>
            <Grid item style={{ ...gridBody, background: "#FDFDFD" }}>
              {!IS_MOBILE && <br />}
              <Content stage={props.stage} />
            </Grid>
            <Grid item style={{ ...gridBody, background: "#FDFDFD" }}>
              <Footer stage={props.stage} setStage={props.setStage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {!matchesMobile && (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              width: "100%",
              background: "#202020",
              marginTop: "auto",
            }}
          >
            hi
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              wrap="nowrap"
              // spacing={2}
              // style={{ margin: 0, marginRight: -20 }}
            >
              <Grid item>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontFamily: '"Proxima Nova", Sans-serif',
                    fontSize: "2em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      letterSpacing: 1,
                    }}
                    href={"https://www.barebutlers.co.nz/"}
                  >
                    BACK TO HOMEPAGE
                  </a>
                </div>
                <br />
              </Grid>
              <Grid item>
                <hr style={{ width: 450, color: "#F4F4F4" }} />
                <br />
              </Grid>
              <Grid item>
                <Typography style={{ color: "#F4F4F4", fontSize: 12 }}>
                  Copyright © Bare Butlers ® 2021
                </Typography>
                <br />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default connector(MyComponent);
