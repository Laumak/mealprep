import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import RadioGroup from "../../../components/radioGroup";

const propTypes = {
  meal: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  submitButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func,
};

const defaultProps = {
  meal: {},
  submitButtonText: "Create",
};

const options = [
  {
    value: "home",
    title: "At home",
    parent: "type",
  }, {
    value: "out",
    title: "Eating out",
    parent: "type",
  },
];

const MealForm = props => {
  const submitButtonClasses = classNames({
    button: true,
    "is-success": true,
    "is-loading": props.loading,
  });

  const deleteButtonClasses = classNames({
    button: true,
    "is-danger": true,
    "is-loading": props.loading,
  });

  return (
    <div className="columns">
      <form className="column is-8 is-offset-2" onSubmit={props.handleOnSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <p className="control">
            <input
              name="title"
              className="input"
              type="text"
              placeholder="Meal's name"
              onChange={props.handleOnChange}
              value={props.meal.title}
            />
          </p>
        </div>

        <RadioGroup
          label="Meal type"
          options={options}
          onChange={props.handleOnChange}
          selectedValue={props.meal.type}
        />

        <div className="field">
          <label className="label">URL</label>
          <p className="control">
            <input
              name="url"
              className="input"
              type="text"
              placeholder="Where did you find this meal?"
              onChange={props.handleOnChange}
              value={props.meal.url}
            />
          </p>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <p className="control">
            <textarea
              name="description"
              className="textarea"
              placeholder="Description"
              onChange={props.handleOnChange}
              value={props.meal.description}
            ></textarea>
          </p>
        </div>

        <button className={submitButtonClasses} disabled={props.loading}>
         {props.submitButtonText}
        </button>
        {
          props.handleOnDelete &&
            <button
              className={deleteButtonClasses}
              disabled={props.loading}
              onClick={e => props.handleOnDelete(e, props.meal.id)}
              style={{ marginLeft: 10 }}
            >
              {props.deleteButtonText}
            </button>
        }
      </form>
    </div>
  );
};

MealForm.propTypes    = propTypes;
MealForm.defaultProps = defaultProps;

export default MealForm;
