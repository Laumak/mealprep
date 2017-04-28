import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import navigate from "../../../utils/navigate";

import Card from "../../../components/card";
import Pagination from "../../../components/pagination";

class Meals extends Component {
  static propTypes = {
    meals: PropTypes.shape({
      data: PropTypes.array,
      prev_page_url: PropTypes.string,
      next_page_url: PropTypes.string,
      total: PropTypes.number,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    loading: false,
  };

  onHeaderClick = id => navigate(`/meal/${id}`, this.context);

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

              <button className="button is-success" onClick={() => navigate(`/meal/create`, this.context)}>
                Create a meal
              </button>
            </div>
        }
      </section>

    );
  }
}

const mapState = state => ({
  meals: state.selected.meals,
  loading: state.selected.loading,
});

export default connect(mapState)(Meals);
