import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import Loading from "./Components/Loading";
import Providers from "./Components/providers";
import Containers from "./Containers";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./utils/fb";

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Suspense fallback={<Loading />}>
        <Route path="/">
          <Containers />
        </Route>
      </Suspense>
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.register();
