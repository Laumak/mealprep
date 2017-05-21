import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

const defaultProps = {
  className: "",
}

const ContentWrapper = props => {
  return (
    <div className={`container ${props.className}`}>
      <section className="section">
        {props.children}
      </section>
    </div>
  )
}

ContentWrapper.propTypes    = propTypes
ContentWrapper.defaultProps = defaultProps

export default ContentWrapper
