import React from "react"
import PropTypes from "prop-types"

import CSSModules from "react-css-modules"
import styles     from "./hero.sass"

const propTypes = {
  title:    PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

const Hero = props =>
  <section className="hero is-primary is-bold">
    <div className="container">
      <div className="hero-body">
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

const styled = CSSModules(Hero, styles)

export default styled
