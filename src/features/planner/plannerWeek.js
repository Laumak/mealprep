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
  return(
    <div className="planner-week">
      <h2 className="title is-3">Viikko {weekNumber}</h2>

      <div className="columns is-multiline">
        { renderDays(days) }
      </div>
    </div>
  );
};

PlannerWeek.propTypes = propTypes;

export default PlannerWeek;
