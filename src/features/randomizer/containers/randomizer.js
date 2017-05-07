import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import navigate from "../../../utils/navigate"

import { FetchRandomMeal } from "../actions"

import Hero from "../../../components/hero"
import ContentWrapper from "../../../components/contentWrapper"
import Loader from "../../../components/loader"
import LoadingButton from "../../../components/loadingButton"
import Card from "../../../components/card"
import RadioGroup from "../../../components/radioGroup"

class Randomizer extends Component {
  static propTypes = {
    fetchRandomMeal: PropTypes.func.isRequired,
    randomMeal: PropTypes.object,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
    mealVisible: false,
    mealType: null,
    noResults: false,
  }

  generateMeal = () => {
    this.setState({ loading: true, noResults: false })

    this.props.fetchRandomMeal({ type: this.state.mealType })
      .then(() =>
        this.setState({ mealVisible: true, loading: false })
      )
      .catch(() =>
        this.setState({ mealVisible: false, loading: false, noResults: true })
      )
  }

  handleOnRadioChange = e => {
    const value = e.target.value

    this.setState({ mealType: value })
  }

  onHeaderClick = id => navigate(`/meal/${id}`, this.context)

  render() {
    const { randomMeal } = this.props

    const options = [
      {
        value: "home",
        title: "At home",
        parent: "meal-type",
      }, {
        value: "out",
        title: "Eating out",
        parent: "meal-type",
      },
    ]

    return (
      <div className="randomizer">
        <Hero title="Randomizer" />

        <ContentWrapper>
          <div className="generator">
            <div className="options">
              <RadioGroup
                options={options}
                onChange={this.handleOnRadioChange}
                selectedValue={this.state.mealType}
              />

              {
                !!this.state.mealType &&
                  <button
                    className="button is-danger clear-selection"
                    onClick={() => this.setState({ mealType: null })}
                  >
                    Clear
                  </button>
              }
            </div>

            <LoadingButton
              className="button is-success is-large is-fullwidth"
              text="Generate a random meal"
              loading={this.state.loading}
              handleOnClick={this.generateMeal}
            />
          </div>

          <Loader loading={this.state.loading}>
            <span>
            {
              this.state.mealVisible &&
                <Card
                  title={randomMeal.title}
                  id={randomMeal.id}
                  onHeaderClick={this.onHeaderClick}
                >
                  <article className="content">
                    <p>{randomMeal.description}</p>
                  </article>
                </Card>
            }

            {
              this.state.noResults &&
                <Card title="No results found">
                  <article className="content">
                    <p>No results for the given filters.</p>
                  </article>
                </Card>
            }
            </span>
          </Loader>
        </ContentWrapper>
      </div>
    )
  }
}

const mapState = state => ({
  randomMeal: state.meals.random,
})

const mapDispatch = dispatch => ({
  fetchRandomMeal: props => dispatch(FetchRandomMeal(props)),
})

export default connect(mapState, mapDispatch)(Randomizer)
