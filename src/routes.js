import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./app";
import Home from "./features/home";
import Randomizer from "./features/randomizer";
import Planner from "./features/planner";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="randomizer" component={Randomizer} />
        <Route path="planner" component={Planner} />
    </Route>
);
