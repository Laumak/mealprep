import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  title:    PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

const Hero = props =>
  <section className="hero is-primary is-bold">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {props.title}
        </h1>

        {
          props.subtitle &&
          <h2 className="subtitle">
            {props.subtitle}
          </h2>
        }
      </div>
    </div>
  </section>

Hero.propTypes = propTypes

export default Hero
