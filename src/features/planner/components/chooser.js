import React from "react";
import PropTypes from "prop-types";

import Select from "../../../components/select";

const propTypes = {
  type: PropTypes.string.isRequired,
  chosenType: PropTypes.string,
  handleTypeChoosing: PropTypes.func.isRequired,
};

const MealChooser = props => {
  return (
    <div>
    {
      !props.chosenType ?
        <div className="field is-grouped">
          <p className="control">
            <a
              className="button is-small"
              onClick={() => props.handleTypeChoosing(props.type, "choose")}
            >
              Choose a meal
            </a>
          </p>
          <p className="control">
            <a
              className="button is-success is-small"
              onClick={() => props.handleTypeChoosing(props.type, "random")}
            >
              Random meal
            </a>
          </p>
        </div> :
        <div>
          {
            props.chosenType === "choose" ?
              <Select /> :
              <p>Random</p>
          }

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-danger is-small"
                onClick={() => props.handleTypeChoosing(props.type)}
              >
                Back
              </button>
            </div>

            <div className="control">
              <button
                className="button is-success is-small"
              >
                Save
              </button>
            </div>
          </div>
        </div>
    }
    </div>
  );
};

MealChooser.propTypes = propTypes;

export default MealChooser;
