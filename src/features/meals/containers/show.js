import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { FetchMeal } from "../actions";

import Card from "../../../components/card";

class ShowMeal extends Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    fetchMeal: PropTypes.func.isRequired,
    meal: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      headerImage: PropTypes.string,
      images: PropTypes.array,
      type: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const id = this.props.routeParams.id;

    this.props.fetchMeal(id);
  }

  componentWillReceiveProps({ meal, routeParams }) {
    if(meal && meal.id !== +routeParams.id) {
      return this.props.fetchMeal(routeParams.id);
    }
  }

  render() {
    return(
      <article className="meal">
        <Card title={this.props.meal.title}>
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
        </Card>
      </article>
    );
  }
}

const mapState = state => {
  return {
    meal: state.selected.meal,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchMeal: (id) => dispatch(FetchMeal(id)),
  };
};

export default connect(mapState, mapDispatch)(ShowMeal);
