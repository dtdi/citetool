import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { mergeStyles, initializeIcons } from "@fluentui/react";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://6b5e57b77ebf466980c9e68d76da6978@o503871.ingest.sentry.io/5589576",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#app)": {
      margin: 0,
      padding: 0,
      height: "100vh",
    },
  },
});

initializeIcons();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
