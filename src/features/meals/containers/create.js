import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { browserHistory } from "react-router";

import { StoreMeal } from "../actions";

import RadioGroup from "../../../components/radioGroup";

const options = [
  {
    value: "at-home",
    title: "At home",
    parent: "mealType",
  }, {
    value: "out",
    title: "Eating out",
    parent: "mealType",
  },
];

class CreateMeal extends Component {
  static propTypes = {
    storeMeal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: "",
      mealType: "",
      url: "",
      description: "",
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const value = e.target.value;

    return this.setState({ [e.target.name]: value });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const meal = {
      title: this.state.title,
      type: this.state.mealType,
      url: this.state.url,
      description: this.state.description,
    };

    this.props.storeMeal(meal)
      .then(resp => {
        this.setState({ loading: false });

        browserHistory.push(`/meal/${resp.data.meal.id}`);
      });
  }

  render() {
    const buttonClasses = classNames({
      button: true,
      "is-success": true,
      "is-loading": this.state.loading,
    });

    return(
      <div className="columns">
        <form className="column is-8 is-offset-2" onSubmit={this.handleOnSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <p className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Meal's name"
                onChange={this.handleOnChange}
              />
            </p>
          </div>

          <RadioGroup
            label="Meal type"
            options={options}
            onChange={this.handleOnChange}
          />

          <div className="field">
            <label className="label">URL</label>
            <p className="control">
              <input
                name="url"
                className="input"
                type="text"
                placeholder="Where did you find this meal?"
                onChange={this.handleOnChange}
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
                onChange={this.handleOnChange}
              ></textarea>
            </p>
          </div>

          <button
            className={buttonClasses}
            disabled={this.state.loading}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    storeMeal: meal => dispatch(StoreMeal(meal)),
  };
};

export default connect(null, mapDispatch)(CreateMeal);
