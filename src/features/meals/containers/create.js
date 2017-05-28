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
    files: [],
  }

  onDrop = (accepted/*, rejected*/) => {
    this.setState({ files: [ ...accepted, ...this.state.files ] })
  }

  onFileClick = (e) => {
    e.stopPropagation();

    const files = this.state.files.filter(file =>
      file.preview !== e.currentTarget.currentSrc
    )

    this.setState({ files })
  }

  handleOnChange = e => {
    const { value, name } = e.target
    const meal = { ...this.state.meal, [name]: value }

    return this.setState({ meal })
  }

  handleOnSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })

    const files = new FormData()
    files.append("file", document.getElementById("file").files[0])

    this.props.storeMeal(this.state.meal, files)
      .then(meal => {
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
                files={this.state.files}
                loading={this.state.loading}
                handleOnChange={this.handleOnChange}
                handleOnSubmit={this.handleOnSubmit}
                onDrop={this.onDrop}
                onFileClick={this.onFileClick}
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
    storeMeal: (meal, files) => dispatch(StoreMeal(meal, files)),
  }
}

export default connect(null, mapDispatch)(CreateMeal)
