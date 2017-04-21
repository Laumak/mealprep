import React, { Component } from "react";
import PropTypes from "prop-types";

import Card        from "../../components/card";
import MealChooser from "./components/chooser";

class PlannerDay extends Component {
  static propTypes = {
    day: PropTypes.string,
    lunch: PropTypes.string,
    dinner: PropTypes.string,
  }

  state = {
    chosenLunch: "",
    chosenDinner: "",
  }

  handleTypeChoosing = (type, bmeal) => {
    if(type === "lunch") {
      if(bmeal) {
        return this.setState({ chosenLunch: bmeal });
      }

      this.setState({ chosenLunch: "" });
    }

    if(type === "dinner") {
      if(bmeal) {
        return this.setState({ chosenDinner: bmeal });
      }
      this.setState({ chosenDinner: "" });
    }
  }

  render() {
    return (
      <article className="day column is-half">
        <Card title={this.props.day}>
          <div className="content">
            <div className="columns">
              <div className="column is-half">
                <h3>Lounas</h3>
                <MealChooser
                  type="lunch"
                  chosenType={this.state.chosenLunch}
                  handleTypeChoosing={this.handleTypeChoosing}
                />
              </div>

              <div className="column">
                <h3>Päivällinen</h3>
                <MealChooser
                  type="dinner"
                  chosenType={this.state.chosenDinner}
                  handleTypeChoosing={this.handleTypeChoosing}
                />
              </div>
            </div>
          </div>
        </Card>
      </article>
    );
  }
}

export default PlannerDay;
