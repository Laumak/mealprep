import React from "react"
import PropTypes from "prop-types"

import CSSModules from "react-css-modules"
import styles     from "./radio.sass"

const propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
}

const RadioItem = ({ option: { value, title, parent }, onChange, selectedValue }) => {
  return (
    <span className="radio-item" styleName="radio-item">
      <input
        type="radio"
        name={parent}
        id={value}
        value={value}
        onChange={onChange}
        checked={value === selectedValue}
      />

      <label className="radio" htmlFor={value}>
        <span className="radio-button"></span>
        { title }
      </label>
    </span>
  )
}

RadioItem.propTypes = propTypes

const styled = CSSModules(RadioItem, styles)

export default styled
