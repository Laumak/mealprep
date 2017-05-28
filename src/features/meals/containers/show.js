import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import navigate from "../../../utils/navigate"

import { FetchMeal } from "../actions"

import Card from "../../../components/card"
import ContentWrapper from "../../../components/contentWrapper"

class ShowMeal extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    fetchMeal: PropTypes.func.isRequired,

    meal: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      header_image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      type: PropTypes.string,
    }),
    authenticated: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
  }

  componentDidMount() {
    const id = this.props.match.params.id

    this.props.fetchMeal(id)
  }

  componentWillReceiveProps({ meal, match }) {
    if(meal && meal.id !== +match.params.id) {
      return this.props.fetchMeal(match.params.id)
    }
  }

  onHeaderClick = id => navigate(`/meal/${id}/edit`, this.context)

  render() {
    return (
      <ContentWrapper>
        <article className="meal">
          <Card
            title={this.props.meal.title}
            id={this.props.meal.id}
            onHeaderClick={this.onHeaderClick}
            headerButtonText="Edit"
            auth={this.props.authenticated}
          >
            <p><b>Type:</b> {this.props.meal.type}</p>
            <div>
              <span><b>Address: </b></span>
              <a href={this.props.meal.url} target="_blank" rel="noopener noreferrer">
                {this.props.meal.url}
              </a>
            </div>
            <br />

            <b>Description:</b>
            <p>{this.props.meal.description}</p>

            {
              this.props.meal.header_image &&
                <img src={this.props.meal.header_image.url} alt=""/>
            }
          </Card>
        </article>
      </ContentWrapper>
    )
  }
}

const mapState = state => ({
  meal: state.meals.selected,
  authenticated: state.auth.authenticated,
})

const mapDispatch = dispatch => ({
  fetchMeal: id => dispatch(FetchMeal(id)),
})

export default connect(mapState, mapDispatch)(ShowMeal)
