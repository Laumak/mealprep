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

const App = () => {
  return (
    <div>
      <Nav title="Meal Prep" links={links} />

      <Route path="/" component={Hero}></Route>

      <section className="section main-content">
        <div className="container">
          <Route path="/" exact component={Home} />

          <Route path="/randomizer" component={Randomizer} />
          <Route path="/planner" component={Planner} />
          <Route path="/meals" component={Meals} />
          <Switch>
            <Route path="/meal/create" component={CreateMeal} />
            <Route path="/meal/:id" component={ShowMeal} />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default App;
