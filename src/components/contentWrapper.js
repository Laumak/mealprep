import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.any.isRequired,
}

const ContentWrapper = props => {
  return (
    <section className="section main-content">
      <div className="container">
        {props.children}
      </div>
    </section>
  )
}

ContentWrapper.propTypes = propTypes

export default ContentWrapper
