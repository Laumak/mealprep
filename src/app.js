import React from "react"
import { Route, Switch } from "react-router-dom"
import "./styles/app.scss"
import "../node_modules/font-awesome/css/font-awesome.css"

import Authenticated from "./HoC/authenticated"

import Nav from "./components/nav"

import Authentication from "./features/authentication"

import Planner    from "./features/planner"
import Randomizer from "./features/randomizer"
import Profile    from "./features/profile"

import Meals      from "./features/meals/containers/meals"
import ShowMeal   from "./features/meals/containers/show"
import EditMeal   from "./features/meals/containers/edit"
import CreateMeal from "./features/meals/containers/create"

const links = [
  {
    url: "/planner",
    name: "Planner",
    auth: true,
  }, {
    url: "/randomizer",
    name: "Randomizer",
    auth: false,
  }, {
    url: "/meals",
    name: "Meals",
    auth: false,
  },
]

const App = () => (
  <div className="app-container">
    <Nav title="MealPrep" links={links} />

    <Route path="/" exact component={Authenticated(Planner)} />

    <Route path="/login" component={Authentication} />
    <Route path="/register" component={Authentication} />

    <Route path="/meals" component={Meals} />
    <Route path="/randomizer" component={Randomizer} />

    <Route path="/planner" exact component={Authenticated(Planner)} />
    <Route path="/planner/:number/:year?" component={Authenticated(Planner)} />

    <Route path="/profile" component={Authenticated(Profile)} />

    <Switch>
      <Route path="/meal/create" component={Authenticated(CreateMeal)} />
      <Route path="/meal/:id/edit" component={Authenticated(EditMeal)} />
      <Route path="/meal/:id" component={ShowMeal} />
    </Switch>
  </div>
)

export default App
