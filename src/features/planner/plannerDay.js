import React from "react";
import PropTypes from "prop-types";

import Card        from "../../components/card";
import MealChooser from "./components/chooser";

const propTypes = {
  day: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lunch: PropTypes.array,
    dinner: PropTypes.array,
  }),
};

const PlannerDay = props => {
  return (
    <article className="day column is-half">
      <Card title={props.day.name}>
        <div className="content">
          <div className="columns">

            <div className="column is-half">
              <h3>Lunch</h3>

              <MealChooser type="lunch" meal={props.day.lunch[0]} />
            </div>

            <div className="column">
              <h3>Dinner</h3>

              <MealChooser type="dinner" meal={props.day.dinner[0]} />
            </div>

          </div>
        </div>
      </Card>
    </article>
  );
};

PlannerDay.propTypes = propTypes;

export default PlannerDay;
