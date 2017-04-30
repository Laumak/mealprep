import React, { PropTypes } from "react";

const propTypes = {
  initialWeek: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }).isRequired,
  goToWeek: PropTypes.func.isRequired,
};

const WeekNavigation = props => {
  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <a className="title" onClick={() => props.goToWeek("prev")}>Week {props.initialWeek.number - 1}</a>
        </div>
      </div>
      <div className="level-item has-text-centered current">
        <div>
          <span className="title">Week {props.initialWeek.number}</span>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <a className="title" onClick={() => props.goToWeek("next")}>Week {props.initialWeek.number + 1}</a>
        </div>
      </div>
    </nav>
  );
};

WeekNavigation.propTypes = propTypes;

export default WeekNavigation;
