import React from "react";
import PropTypes from "prop-types";

import PlannerDay from "./plannerDay";

const propTypes = {
  weekNumber: PropTypes.number.isRequired,
  days: PropTypes.array.isRequired,
};

function renderDays(days) {
  return days.map(({ name, lunch, dinner }) =>
    <PlannerDay
      day={name}
      lunch={lunch}
      dinner={dinner}
      key={name}
    />
  );
}

const PlannerWeek = ({ weekNumber, days }) => {
  return (
    <div className="planner-week">
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <a className="title">Viikko {weekNumber - 1}</a>
          </div>
        </div>
        <div className="level-item has-text-centered current">
          <div>
            <a className="title">Viikko {weekNumber}</a>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <a className="title">Viikko {weekNumber + 1}</a>
          </div>
        </div>
      </nav>

      <div className="columns is-multiline">
        { renderDays(days) }
      </div>
    </div>
  );
};

PlannerWeek.propTypes = propTypes;

export default PlannerWeek;
