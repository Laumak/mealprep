import React from "react"
import PropTypes from "prop-types"

import Card        from "../../components/card"
import MealChooser from "./components/chooser"

const propTypes = {
  day: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lunch: PropTypes.array,
    dinner: PropTypes.array,
  }),
  open: PropTypes.bool.isRequired,
}

const PlannerDay = props => {
  return (
    <article className="day column is-half">
      <Card title={props.day.name} toggleable={true} open={props.open}>
        <div className="content">
          <div className="columns is-desktop">

            <div className="column is-half-desktop">
              <h3>Lunch</h3>

              <MealChooser
                type="lunch"
                meal={props.day.lunch[0]}
                dayID={props.day.id}
              />
            </div>

            <div className="column is-half-desktop">
              <h3>Dinner</h3>

              <MealChooser
                type="dinner"
                meal={props.day.dinner[0]}
                dayID={props.day.id}
              />
            </div>

          </div>
        </div>
      </Card>
    </article>
  )
}

PlannerDay.propTypes = propTypes

export default PlannerDay
