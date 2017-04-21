import React from "react";
import PropTypes from "prop-types";

import RadioItem from "./radioItem";

const propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

const renderItems = (options, onChange) => {
  return options.map(option => (
    <RadioItem
      option={option}
      onChange={onChange}
      key={option.value}
    />
  ));
};

const RadioGroup = (props) => {
  return (
    <div className="radio-group">
      {
        props.label &&
          <label className="label">{props.label}</label>
      }

      <p className="control">
        { renderItems(props.options, props.onChange) }
      </p>
    </div>
  );
};

RadioGroup.propTypes = propTypes;

export default RadioGroup;
