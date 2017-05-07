import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import navigate from "../../../utils/navigate"

import { StoreMeal } from "../actions"

import Card from "../../../components/card"
import ContentWrapper from "../../../components/contentWrapper"

import MealForm from "../components/mealForm"

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
    meal: {
      title: "",
      mealType: "",
      url: "",
      description: "",
    },
  }

  handleOnChange = e => {
    const { value, name } = e.target
    const meal = { ...this.state.meal, [name]: value }

    return this.setState({ meal })
  }

  handleOnSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })

    this.props.storeMeal(this.state.meal)
      .then(meal => {
        this.setState({ loading: false })

        return navigate(`/meal/${meal.id}`, this.context)
      })
  }

  render() {
    return (
      <ContentWrapper>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <Card title="Create a meal">
              <MealForm
                meal={this.state.meal}
                loading={this.state.loading}
                handleOnChange={this.handleOnChange}
                handleOnSubmit={this.handleOnSubmit}
              />
            </Card>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    storeMeal: meal => dispatch(StoreMeal(meal)),
  }
}

export default connect(null, mapDispatch)(CreateMeal)
