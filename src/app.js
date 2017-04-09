import React from "react";
import PropTypes from "prop-types";
import "./styles/app.scss";
import "../node_modules/font-awesome/css/font-awesome.css";

import Nav from "./components/nav";
import Hero from "./components/hero";

const propTypes = {
  children: PropTypes.any.isRequired,
};

const links = [
  {
    url: "/randomizer",
    name: "Randomizer",
  }, {
    url: "/planner",
    name: "Planner",
  }, {
    url: "/meal/create",
    name: "Create a meal",
  },
];

const App = (props) => {
  return(
    <div>
      <Nav
        title="Meal Prep"
        links={links}
      />

      <Hero />

      <section className="section main-content">
        <div className="container">
          {props.children}
        </div>
      </section>
    </div>
  );
};

App.propTypes = propTypes;

export default App;
