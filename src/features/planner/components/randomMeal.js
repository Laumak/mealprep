import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import { FetchRandomMeal } from "../../randomizer/actions";

class RandomMeal extends Component {
  static propTypes = {
    meal: PropTypes.object,
    handleMealChoosing: PropTypes.func.isRequired,
    fetchRandomMeal: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
  }

  componentDidMount() {
    this.handleMealFetching();
  }

  handleMealFetching = () => {
    this.setState({ loading: true });

    this.props.fetchRandomMeal({ type: null, toState: false })
      .then(meal => this.props.handleMealChoosing(meal))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const refreshButtonClasses = classNames({
      "button": true,
      "is-primary": true,
      "is-loading": this.state.loading,
    });

    return (
      <p>
        {
          this.state.loading ?
            <span>...</span> :
            <span>{this.props.meal.title}</span>
        }

        <a
          className={refreshButtonClasses}
          onClick={this.handleMealFetching}
          style={{ "float": "right" }}
        >
          <span className="icon is-small">
            <i className="fa fa-refresh"></i>
          </span>
        </a>
      </p>
    );
  }
}

const mapDispatch = dispatch => ({
  fetchRandomMeal: props => dispatch(FetchRandomMeal(props)),
});

export default connect(null, mapDispatch)(RandomMeal);
