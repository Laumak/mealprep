import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  // options: PropTypes.array.isRequired,
};

const SelectComponent = props => {
  return (
    <div className="field">
      <div className="control">
        <span className="select is-fullwidth">
          <select name="meal" id="meal">
            <option value="meal1">Meal 1</option>
            <option value="meal2">Meal 2</option>
          </select>
        </span>
      </div>
    </div>
  );
};

SelectComponent.propTypes = propTypes;

export default SelectComponent;
