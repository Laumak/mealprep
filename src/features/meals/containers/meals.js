import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { FetchMeals } from "../actions";

import Card from "../../../components/card";

import "../styles/meals.scss";

class Meals extends Component {
  static propTypes = {
    fetchMeals: PropTypes.func.isRequired,
    meals: PropTypes.array.isRequired,
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
    return this.props.meals.map(meal => {
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

    return(
      <section className="meals">
        { this.renderMeals() }
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
