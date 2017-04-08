import React, { Component } from "react";

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

    setTimeout(() => {
      this.setState({
        mealVisible: true,
        loading: false,
      });
    }, 1000);
  }

  render() {
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
            <Card title="Meal name">
              <article className="content">
                <p>Meal description</p>
              </article>
            </Card>
        }
        </Loader>
      </div>
    );
  }
}

export default Randomizer;
