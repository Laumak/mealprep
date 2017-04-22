import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleOnSelect: PropTypes.func.isRequired,
};

const renderOptions = options => {
  return options.map(option =>
    <option value={option.id} key={option.id}>{option.title}</option>
  );
};

const SelectComponent = props => {
  return (
    <div className="field">
      <div className="control">
        <span className="select is-fullwidth">
          <select
            name={props.name}
            id={props.name}
            value={props.value}
            onChange={props.handleOnSelect}
          >
            { renderOptions(props.options) }
          </select>
        </span>
      </div>
    </div>
  );
};

SelectComponent.propTypes = propTypes;

export default SelectComponent;
