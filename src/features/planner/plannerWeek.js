import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FetchCurrentWeek } from "./actions";

import PlannerDay from "./plannerDay";


class PlannerWeek extends Component {
  static propTypes = {
    currentWeek: PropTypes.object.isRequired,
    fetchCurrentWeek: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCurrentWeek();
  }

  renderDays = days => {
    return days.map(day =>
      <PlannerDay day={day} key={day.id} />
    );
  }

  render() {
    return (
      <div className="planner">
        <div className="planner-week">
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <a className="title">Viikko {this.props.currentWeek.number - 1}</a>
              </div>
            </div>
            <div className="level-item has-text-centered current">
              <div>
                <a className="title">Viikko {this.props.currentWeek.number}</a>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <a className="title">Viikko {this.props.currentWeek.number + 1}</a>
              </div>
            </div>
          </nav>

          <div className="columns is-multiline">
            { this.renderDays(this.props.currentWeek.days) }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  currentWeek: state.week.current,
});

const mapDispatch = dispatch => ({
  fetchCurrentWeek: () => dispatch(FetchCurrentWeek()),
});

export default connect(mapState, mapDispatch)(PlannerWeek);
