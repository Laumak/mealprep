import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FetchCurrentWeek, FetchWeek, GoToWeek } from "./actions";

import PlannerDay from "./plannerDay";
import WeekNavigation from "./components/weekNavigation";

class PlannerWeek extends Component {
  static propTypes = {
    currentWeek: PropTypes.object,
    fetchCurrentWeek: PropTypes.func.isRequired,
    fetchWeek: PropTypes.func.isRequired,
    match: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const weekNumber = this.props.match.params.number;
    const year       = this.props.match.params.year;

    if(!weekNumber) {
      return this.props.fetchCurrentWeek();
    }

    this.props.fetchWeek(weekNumber, year);
  }

  handleOnGoToWeek = type => {
    const { router: { history } } = this.context;

    let num;
    const year = this.props.match.params.year;

    if(type === "prev") {
      num = this.props.currentWeek.number - 1;
    }

    if(type === "next") {
      num = this.props.currentWeek.number + 1;
    }

    return this.props.fetchWeek(num, year)
      .then(() => history.push(`/planner/${num}`));
  }

  renderDays = days => {
    return days.map(day => <PlannerDay day={day} key={day.id} />);
  }

  render() {
    const { currentWeek } = this.props;

    return (
      <div className="planner">
        {
          currentWeek.number &&
            <WeekNavigation
              initialWeek={currentWeek}
              goToWeek={this.handleOnGoToWeek}
            />
        }

        <div className="planner-week">
          {
            !!currentWeek.days.length &&
              <div className="columns is-multiline">
                { this.renderDays(currentWeek.days) }
              </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  currentWeek: state.weeks.current,
  weeks: state.weeks.all,
});

const mapDispatch = dispatch => ({
  fetchCurrentWeek: () => dispatch(FetchCurrentWeek()),
  fetchWeek: (number, year) => dispatch(FetchWeek(number, year)),
  goToWeek: number => dispatch(GoToWeek(number)),
});

export default connect(mapState, mapDispatch)(PlannerWeek);
