import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { StoreMeal } from "../actions";

class CreateMeal extends Component {
  static propTypes = {
    storeMeal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: "",
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
      description: this.state.description,
    };

    this.props.storeMeal(meal)
      .then(resp => this.setState({ loading: false }));
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
    storeMeal: (meal) => dispatch(StoreMeal(meal)),
  };
};

export default connect(null, mapDispatch)(CreateMeal);
