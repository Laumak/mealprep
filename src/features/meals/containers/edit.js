import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import navigate from "../../../utils/navigate";

import { EditMeal as EditMealAction, FetchMeal } from "../actions";

import MealForm from "../components/mealForm";


class EditMeal extends Component {
  static propTypes = {
    editMeal: PropTypes.func.isRequired,
    fetchMeal: PropTypes.func.isRequired,
    match: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
    meal: {
      title: "",
      type: "",
      url: "",
      description: "",
    },
  }

  componentDidMount() {
    const mealID = this.props.match.params.id;

    this.props.fetchMeal(mealID)
      .then(meal => this.setState({ loading: false, meal }));
  }

  handleOnChange = e => {
    const { value, name } = e.target;

    const meal = Object.assign({}, this.state.meal, { [name]: value });

    return this.setState({ meal });
  }

  handleOnSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    this.props.editMeal(this.state.meal)
      .then((meal) => {
        this.setState({ loading: false });

        return navigate(`/meal/${meal.id}`, this.context);
      });
  }

  render() {
    return (
      <MealForm
        meal={this.state.meal}
        loading={this.state.loading}
        submitButtonText="Edit"
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
      />
    );
  }
}

const mapState = state => ({
  meal: state.selected.meal,
});

const mapDispatch = dispatch => ({
  editMeal: meal => dispatch(EditMealAction(meal)),
  fetchMeal: id => dispatch(FetchMeal(id)),
});

export default connect(mapState, mapDispatch)(EditMeal);
