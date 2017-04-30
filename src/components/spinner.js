import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  loading: PropTypes.bool.isRequired,
}

const Spinner = props => {
  if(!props.loading) {
    return null
  }

  return (
    <div className="spinner-backdrop">
      <div className="spinner">
        <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

Spinner.propTypes = propTypes

export default Spinner
