import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FetchMeals } from "../actions";

import Card from "../../../components/card";
import Pagination from "../../../components/pagination";

class Meals extends Component {
  static propTypes = {
    fetchMeals: PropTypes.func.isRequired,
    meals: PropTypes.shape({
      data: PropTypes.array,
      prev_page_url: PropTypes.string,
      next_page_url: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.fetchMeals()
      .then(() => this.setState({ loading: false }));
  }

  renderMeals() {
    return this.props.meals.data.map(meal => {
      return (
        <Card title={meal.title} key={meal.id} className="meal">
          <p>{meal.description}</p>
        </Card>
      );
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <Card title="..." className="meal">
          <p>...</p>
        </Card>
      );
    }

    return (
      <section>
        <div className="meals">
          { this.renderMeals() }
        </div>

        <Pagination
          prevPageUrl={this.props.meals.prev_page_url}
          nextPageUrl={this.props.meals.next_page_url}
        />
      </section>

    );
  }
}

const mapState = state => {
  return {
    meals: state.selected.meals,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchMeals: () => dispatch(FetchMeals()),
  };
};

export default connect(mapState, mapDispatch)(Meals);
