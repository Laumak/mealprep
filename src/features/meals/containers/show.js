import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { FetchMeal } from "../actions";

import Card from "../../../components/card";

class ShowMeal extends Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    fetchMeal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      meal: {},
    };
  }

  componentWillMount() {
    const id = this.props.routeParams.id;

    this.props.fetchMeal(id)
      .then(resp => this.setState({ meal: resp.data.meal }));
  }

  render() {
    return(
      <article className="meal">
        <Card title={this.state.meal.title}>
          {this.state.meal.description}
        </Card>
      </article>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMeal: (id) => dispatch(FetchMeal(id)),
  };
};

export default connect(null, mapDispatch)(ShowMeal);
