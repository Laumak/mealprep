import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SaveDailyMeal } from "../actions";

import RandomMealChooser from "./randomMeal";
import Select from "../../../components/select";

class MealChooser extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    meal: PropTypes.object,
    saveDailyMeal: PropTypes.func.isRequired,
  }

  state = {
    chosenType: "",
    newLunch: {},
    newDinner: {},
  }

  handleTypeChoosing = type => this.setState({ chosenType: type });

  handleMealSaving = type => {
    this.setState({ loading: true });

    const mealID = type === "lunch" ? this.state.newLunch.id : this.state.newDinner.id;
    const dayID  = this.props.meal.pivot.day_id;

    const payload = { type, dayID, mealID };

    this.props.saveDailyMeal(payload)
      .then(() => this.setState({ newLunch: {}, newDinner: {}, chosenType: "" }))
      .then(() => this.setState({ loading: true }));
  }

  handleMealChoosing = meal => {
    if(this.props.type === "lunch") {
      return this.setState({ newLunch: meal });
    }

    return this.setState({ newDinner: meal });
  }

  render() {
    let meal = this.props.meal;

    if(this.props.type === "lunch" && Object.keys(this.state.newLunch).length) {
      meal = this.state.newLunch;
    }

    if(this.props.type === "dinner" && Object.keys(this.state.newDinner).length) {
      meal = this.state.newDinner;
    }

    return (
      <div>
      {
        !this.state.chosenType && this.props.meal && Object.keys(this.props.meal).length &&
          <p>{this.props.meal.title}</p>
      }
      {
        !this.state.chosenType ?
          <div className="field is-grouped">
            <div className="control">
              <a
                className="button is-small"
                onClick={() => this.handleTypeChoosing("choose")}
              >
                Choose a meal
              </a>
            </div>
            <div className="control">
              <a
                className="button is-success is-small"
                onClick={() => this.handleTypeChoosing("random")}
              >
                Random meal
              </a>
            </div>
          </div> :
          <div>
            {
              this.state.chosenType === "choose" ?
                <Select /> :
                <RandomMealChooser
                  meal={meal}
                  handleMealChoosing={this.handleMealChoosing}
                />
            }

            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-danger is-small"
                  onClick={() => this.handleTypeChoosing(null)}
                >
                  Back
                </button>
              </div>

              <div className="control">
                <button
                  className="button is-success is-small"
                  onClick={() => this.handleMealSaving(this.props.type)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
      }
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  saveDailyMeal: props => dispatch(SaveDailyMeal(props)),
});

export default connect(null, mapDispatch)(MealChooser);
