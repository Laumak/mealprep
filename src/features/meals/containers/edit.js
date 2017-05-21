import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import navigate from "../../../utils/navigate"

import { EditMeal as EditMealAction, FetchMeal, DeleteMeal } from "../actions"

import Card from "../../../components/card"
import ContentWrapper from "../../../components/contentWrapper"

import MealForm from "../components/mealForm"

class EditMeal extends Component {
  static propTypes = {
    editMeal: PropTypes.func.isRequired,
    fetchMeal: PropTypes.func.isRequired,
    deleteMeal: PropTypes.func.isRequired,
    match: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
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
    const mealID = this.props.match.params.id

    this.setState({ loading: true })

    this.props.fetchMeal(mealID)
      .then(meal => this.setState({ loading: false, meal }))
  }

  handleOnChange = e => {
    const { value, name } = e.target

    const meal = { ...this.state.meal, [name]: value }

    return this.setState({ meal })
  }

  handleOnSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })

    this.props.editMeal(this.state.meal)
      .then(meal => {
        this.setState({ loading: false })

        return navigate(`/meal/${meal.id}`, this.context)
      })
  }

  handleOnDelete = (e, id) => {
    e.preventDefault()

    this.setState({ loading: true })

    this.props.deleteMeal(id)
      .then(() => {
        this.setState({ loading: false })

        return navigate("/meals", this.context)
      })
  }

  render() {
    return (
      <ContentWrapper>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <Card title={this.state.loading ? "..." : this.state.meal.title}>
              <MealForm
                meal={this.state.meal}
                loading={this.state.loading}
                submitButtonText="Save"
                deleteButtonText="Delete"
                handleOnChange={this.handleOnChange}
                handleOnSubmit={this.handleOnSubmit}
                handleOnDelete={this.handleOnDelete}
              />
            </Card>
          </div>
        </div>
      </ContentWrapper>
    )
  }
}

const mapState = state => ({
  meal: state.meals.selected,
})

const mapDispatch = dispatch => ({
  editMeal: meal => dispatch(EditMealAction(meal)),
  fetchMeal: id => dispatch(FetchMeal(id)),
  deleteMeal: id => dispatch(DeleteMeal(id)),
})

export default connect(mapState, mapDispatch)(EditMeal)
