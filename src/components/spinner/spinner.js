import React from "react"
import PropTypes from "prop-types"

import CSSModules from "react-css-modules"
import styles     from "./spinner.sass"

const propTypes = {
  loading: PropTypes.bool.isRequired,
}

const Spinner = props => {
  if(!props.loading) {
    return null
  }

  return (
    <div styleName="spinner-backdrop">
      <div styleName="spinner">
        <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

Spinner.propTypes = propTypes

const styled = CSSModules(Spinner, styles)

export default styled
