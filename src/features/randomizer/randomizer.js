import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FetchRandomMeal } from "./actions";

import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import Card from "../../components/card";

class Randomizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      mealVisible: false,
    };

    this.generateMeal = this.generateMeal.bind(this);
  }



  generateMeal() {
    this.setState({ loading: true });

    this.props.fetchRandomMeal()
      .then(() =>
        this.setState({ mealVisible: true, loading: false })
      );
  }

  render() {
    const { randomMeal } = this.props;

    return(
      <div>
        <div className="generator" style={{ marginBottom: 20 }}>
          <LoadingButton
            className="button is-success is-large is-fullwidth"
            text="Generate a random meal"
            loading={this.state.loading}
            handleOnClick={this.generateMeal}
          />
        </div>

        <Loader loading={this.state.loading}>
        {
          this.state.mealVisible &&
            <Card title={randomMeal.title}>
              <article className="content">
                <p>{randomMeal.description}</p>
              </article>
            </Card>
        }
        </Loader>
      </div>
    );
  }
}

Randomizer.propTypes = {
  fetchRandomMeal: PropTypes.func.isRequired,
  randomMeal: PropTypes.object,
};

const mapState = state => {
  return {
    randomMeal: state.random.meal,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchRandomMeal: () => dispatch(FetchRandomMeal()),
  };
};

export default connect(mapState, mapDispatch)(Randomizer);
