import React from "react"
import PropTypes from "prop-types"

import classNames from "classnames"

import dateParser from "../../../utils/dateParser"

import Card        from "../../../components/card"
import MealChooser from "./chooser"

const propTypes = {
  day: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    lunch: PropTypes.array,
    dinner: PropTypes.array,
  }),
  open: PropTypes.bool.isRequired,
}

const isToday = date => {
  const today   = new Date().setHours(0,0,0,0)
  const dayTime = new Date(date).getTime()

  return today === dayTime
}

const PlannerDay = props => {
  const date = dateParser(props.day.date)
  let title  = `${date.dayName} (${date.dayNum}.${date.monthNum})`

  const dayClasses = classNames({
    day: true,
    column: true,
    "is-half": true,
    "is-today": isToday(props.day.date),
  })

  return (
    <article className={dayClasses}>
      <Card title={title} toggleable={true} open={props.open}>
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
