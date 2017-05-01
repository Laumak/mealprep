import React from "react";
import PropTypes from "prop-types";

import RadioItem from "./radioItem";

const propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,        // eslint-disable-line
  selectedValue: PropTypes.string, // eslint-disable-line
};

const RadioGroup = props => {
  const renderItems = () => {
    return props.options.map(option => (
      <RadioItem
        option={option}
        onChange={props.onChange}
        selectedValue={props.selectedValue}
        key={option.value}
      />
    ));
  };

  return (
    <div className="field radio-group">
      { props.label && <label className="label">{props.label}</label> }

      <p className="control">
        { renderItems() }
      </p>
    </div>
  );
};

RadioGroup.propTypes = propTypes;

export default RadioGroup;
