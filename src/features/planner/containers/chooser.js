import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { SaveDailyMeal } from "../actions"
import { DissociateMeal } from "../../meals/actions"

import RandomMealChooser from "../components/randomMeal"
import Select from "../../../components/select"

class MealChooser extends Component {
  static propTypes = {
    dayID: PropTypes.number.isRequired,
    meal: PropTypes.object,
    type: PropTypes.string.isRequired,
    saveDailyMeal: PropTypes.func.isRequired,
    dissociateMeal: PropTypes.func.isRequired,
    allMeals: PropTypes.array,
  }

  static defaultProps = {
    meal: {},
  }

  constructor(props) {
    super(props)

    let lunch = {}
    let dinner = {}

    if(props.type === "lunch") {
      if(props.meal.id) {
        lunch = props.meal
      } else {
        lunch = props.allMeals[0]
      }
    }

    if(props.type === "dinner") {
      if(props.meal.id) {
        dinner = props.meal
      } else {
        dinner = props.allMeals[0]
      }
    }

    this.state = {
      loading: false,
      chosenType: null,
      lunch: lunch,
      dinner: dinner,
    }
  }

  handleTypeChoosing = type => this.setState({ chosenType: type })

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

    if(this.props.type === "lunch") {
      meal = this.state.lunch
    }

    if(this.props.type === "dinner") {
      meal = this.state.dinner
    }

    return (
      <div>
      {
        !this.state.chosenType &&
        !this.state.loading &&
        this.props.meal &&
        Object.keys(this.props.meal).length ?
          <p>
            {this.props.meal.title}

            {
              this.props.meal.id &&
                <a
                  className="button is-danger is-pulled-right"
                  onClick={() => this.props.dissociateMeal({
                    dayID: this.props.dayID,
                    type: this.props.type,
                  })}
                >
                  <span className="icon is-small">
                    <i className="fa fa-times"></i>
                  </span>
                </a>
            }
          </p> :
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
                  Cancel
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
  allMeals: state.meals.all,
})

const mapDispatch = dispatch => ({
  saveDailyMeal: props => dispatch(SaveDailyMeal(props)),
  dissociateMeal: props => dispatch(DissociateMeal(props)),
})

export default connect(mapState, mapDispatch)(MealChooser)
