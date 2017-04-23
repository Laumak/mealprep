import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store/configureStore";

import { FetchMeals } from "./features/meals/actions";

import App from "./app";

const store = configureStore();

store.dispatch(FetchMeals());

const appEl = document.getElementById("app");

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>, appEl
);

if(module.hot) {
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default;

    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>, appEl
    );
  });
}
