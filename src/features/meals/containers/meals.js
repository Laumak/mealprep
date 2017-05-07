import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import navigate from "../../../utils/navigate"

import { FetchMeals } from "../actions"

import Card from "../../../components/card"
import Pagination from "../../../components/pagination"
import ContentWrapper from "../../../components/contentWrapper"

class Meals extends Component {
  static propTypes = {
    meals: PropTypes.shape({
      data: PropTypes.array,
      prev_page_url: PropTypes.string,
      next_page_url: PropTypes.string,
      total: PropTypes.number,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    fetchMeals: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
    hovering: false,
  }

  componentDidMount() {
    this.props.fetchMeals()
  }

  onHeaderClick = id => navigate(`/meal/${id}`, this.context)

  renderMeals() {
    return this.props.meals.data.map(meal => {
      return (
        <Card
          className="meal"
          title={meal.title}
          id={meal.id}
          onHeaderClick={this.onHeaderClick}
          key={meal.id}
        >
          <p>{meal.description}</p>
        </Card>
      )
    })
  }

  render() {
    if(this.state.loading) {
      return (
        <Card title="..." className="meal">
          <p>...</p>
        </Card>
      )
    }

    return (
      <ContentWrapper>
        <Link to="/meal/create" className="button is-success new">
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
          <span className="text">New meal</span>
        </Link>

        {
          this.props.meals.data.length ?
            <div className="meals">
              { this.renderMeals() }

              {
                this.props.meals.total > 10 &&
                  <Pagination
                    nextPageUrl={this.props.meals.next_page_url}
                    loading={this.props.loading}
                  />
              }
            </div> :
            <div className="content">
              <p>No meals found.</p>
            </div>
        }
      </ContentWrapper>
    )
  }
}

const mapState = state => ({
  meals: state.meals.all,
  loading: state.meals.loading,
})

const mapDispatch = dispatch => ({
  fetchMeals: () => dispatch(FetchMeals()),
})

export default connect(mapState, mapDispatch)(Meals)
