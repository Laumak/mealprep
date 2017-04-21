import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import navigate from "../../../utils/navigate";

import { FetchMeal } from "../actions";

import Card from "../../../components/card";

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
      headerImage: PropTypes.string,
      images: PropTypes.array,
      type: PropTypes.string,
    }),
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.fetchMeal(id);
  }

  componentWillReceiveProps({ meal, match }) {
    if(meal && meal.id !== +match.params.id) {
      return this.props.fetchMeal(match.params.id);
    }
  }

  onHeaderClick = id => navigate(`/meal/${id}/edit`, this.context);

  render() {
    return (
      <article className="meal">
        <Card
          title={this.props.meal.title}
          id={this.props.meal.id}
          onHeaderClick={this.onHeaderClick}
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
