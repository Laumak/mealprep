import React from "react";
import PropTypes from "prop-types";

import "./radioStyles.scss";

const propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const RadioItem = ({ option: { value, title, parent }, onChange }) => {
  return(
    <span className="radio-item">
      <input
        type="radio"
        name={parent}
        id={value}
        value={value}
        onChange={onChange}
      />

      <label className="radio" htmlFor={value}>
        <span className="radio-button"></span>
        { title }
      </label>
    </span>
  );
};

RadioItem.propTypes = propTypes;

export default RadioItem;
