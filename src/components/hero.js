import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  subtitle: PropTypes.string,
  location: PropTypes.object.isRequired,
};

const Hero = ({ subtitle, location }) => {
  let title;

  switch(location.pathname) {
    case "/planner": {
      title = "Planner";
      break;
    }
    case "/randomizer": {
      title = "Randomizer";
      break;
    }
    case "/meals": {
      title = "Meals";
      break;
    }
    default: {
      return null;
    }
  }

  return (
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {title}
          </h1>

          {
            subtitle &&
            <h2 className="subtitle">
              {subtitle}
            </h2>
          }
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;

export default Hero;
