import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import navigate from "../../../utils/navigate";

import { StoreMeal } from "../actions";

import MealForm from "../components/mealForm";

class CreateMeal extends Component {
  static propTypes = {
    storeMeal: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
    title: "",
    mealType: "",
    url: "",
    description: "",
  }

  handleOnChange = e => {
    const value = e.target.value;

    return this.setState({ [e.target.name]: value });
  }

  handleOnSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const meal = {
      title: this.state.title,
      type: this.state.mealType,
      url: this.state.url,
      description: this.state.description,
    };

    this.props.storeMeal(meal)
      .then(({ data: { meal }}) => {
        this.setState({ loading: false });

        return navigate(`/meal/${meal.id}`, this.context);
      });
  }

  render() {
    return (
      <MealForm
        loading={this.state.loading}
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
      />
    );
  }
}

const mapDispatch = dispatch => {
  return {
    storeMeal: meal => dispatch(StoreMeal(meal)),
  };
};

export default connect(null, mapDispatch)(CreateMeal);
