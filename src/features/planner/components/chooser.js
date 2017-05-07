import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { SaveDailyMeal } from "../actions"

import RandomMealChooser from "./randomMeal"
import Select from "../../../components/select"

class MealChooser extends Component {
  static propTypes = {
    dayID: PropTypes.number.isRequired,
    meal: PropTypes.object,
    type: PropTypes.string.isRequired,
    saveDailyMeal: PropTypes.func.isRequired,
    allMeals: PropTypes.array,
  }

  static defaultProps = {
    meal: {},
  }

  state = {
    loading: false,
    chosenType: null,
    lunch: {},
    dinner: {},
  }

  handleTypeChoosing = type => {
    this.setState({ chosenType: type })

    if(!this.props.meal.id) {
      this.setState({ [this.props.type]: this.props.allMeals[0] })
    }
  }

  handleMealSaving = type => {
    this.setState({ loading: true })

    const mealID = type === "lunch" ? this.state.lunch.id : this.state.dinner.id
    const dayID  = this.props.dayID

    const payload = { type, dayID, mealID }

    this.props.saveDailyMeal(payload)
      .then(() => this.setState({ lunch: {}, dinner: {}, chosenType: null }))
      .then(() => this.setState({ loading: false }))
  }

  handleTypeMealChoosing = meal => {
    if(this.props.type === "lunch") {
      return this.setState({ lunch: meal })
    }

    return this.setState({ dinner: meal })
  }

  handleMealSelect = e => {
    const mealID = +e.target.value
    const meal = this.props.allMeals.filter(m => m.id === mealID)[0]

    this.handleTypeMealChoosing(meal)
  }

  render() {
    let meal = this.props.meal

    if(this.props.type === "lunch" && Object.keys(this.state.lunch).length) {
      meal = this.state.lunch
    }

    if(this.props.type === "dinner" && Object.keys(this.state.dinner).length) {
      meal = this.state.dinner
    }

    return (
      <div>
      {
        !this.state.chosenType &&
        !this.state.loading &&
        this.props.meal &&
        Object.keys(this.props.meal).length ?
          <p>{this.props.meal.title}</p> :
          !this.state.chosenType &&
            <p>No meal chosen</p>
      }
      {
        !this.state.chosenType ?
          <div className="field is-grouped">
            <div className="control">
              <a
                className="button is-small"
                onClick={() => this.handleTypeChoosing("choose")}
              >
                <span>Choose</span>
              </a>
            </div>
            <div className="control">
              <a
                className="button is-success is-small"
                onClick={() => this.handleTypeChoosing("random")}
              >
                <span>Random</span>
              </a>
            </div>
          </div> :
          <div>
            {
              this.state.chosenType === "choose" ?
                <Select
                  name="meal"
                  options={this.props.allMeals}
                  handleOnSelect={this.handleMealSelect}
                  value={meal.id ? meal.id : ""}
                /> :
                <RandomMealChooser
                  loading={this.state.loading}
                  meal={meal}
                  handleMealChoosing={this.handleTypeMealChoosing}
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
    )
  }
}

const mapState = state => ({
  allMeals: state.meals.allz,
})

const mapDispatch = dispatch => ({
  saveDailyMeal: props => dispatch(SaveDailyMeal(props)),
})

export default connect(mapState, mapDispatch)(MealChooser)
