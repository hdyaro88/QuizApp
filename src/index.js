import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core";
import "./index.css";
import { theme } from "./Components/HelperFiles/themes";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Context";
import { BrowserRouter as Router } from "react-router-dom";
import WithErrorHoc from "./Components/ErrorBoundary/ErrorBox";
const ErrorHoc = WithErrorHoc(App);
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router basename="/">
          <ErrorHoc />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
