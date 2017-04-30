import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/app.scss";
import "../node_modules/font-awesome/css/font-awesome.css";

import Nav from "./components/nav";
import Hero from "./components/hero";

import Home       from "./features/home";
import Planner    from "./features/planner";
import Randomizer from "./features/randomizer";

import Meals      from "./features/meals/containers/meals";
import ShowMeal   from "./features/meals/containers/show";
import EditMeal   from "./features/meals/containers/edit";
import CreateMeal from "./features/meals/containers/create";

const links = [
  {
    url: "/randomizer",
    name: "Randomizer",
  }, {
    url: "/planner",
    name: "Planner",
  }, {
    url: "/meals",
    name: "All meals",
  }, {
    url: "/meal/create",
    name: "Create a meal",
  },
];

const App = () =>
  <div>
    <Nav title="Meal Prep" links={links} />

    <Route path="/" component={Hero}></Route>

    <section className="section main-content">
      <div className="container">
        <Route path="/" exact component={Planner} />

        <Route path="/randomizer" component={Randomizer} />
        <Route path="/meals" component={Meals} />

        <Route path="/planner" exact component={Planner} />
        <Route path="/planner/:number/:year?" component={Planner} />

        <Switch>
          <Route path="/meal/create" component={CreateMeal} />
          <Route path="/meal/:id/edit" component={EditMeal} />
          <Route path="/meal/:id" component={ShowMeal} />
        </Switch>
      </div>
    </section>
  </div>

export default App
