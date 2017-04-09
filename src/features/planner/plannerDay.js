import React from "react";
import PropTypes from "prop-types";
import Card from "../../components/card";

const propTypes = {
  day: PropTypes.string,
  lunch: PropTypes.string,
  dinner: PropTypes.string,
};

const PlannerDay = ({ day, lunch, dinner }) => {
  return(
    <article className="day column is-half">
      <Card title={day}>
        <div className="content">
          <div className="columns">
            <div className="column is-half">
              <h3>Lounas</h3>
              <p>{lunch}</p>
            </div>

            <div className="column">
              <h3>Päivällinen</h3>
              <p>{dinner}</p>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
};

PlannerDay.propTypes = propTypes;

export default PlannerDay;
