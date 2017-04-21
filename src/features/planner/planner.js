import React, { Component } from "react";

import PlannerWeek from "./plannerWeek";

const weeks = [
  {
    weekNumber: 16,
    days: [
      {
        name: "Maanantai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Tiistai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Keskiviikko",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Torstai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Perjantai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Lauantai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      }, {
        name: "Sunnuntai",
        lunch: "Lunch",
        dinner: "Dinner",
        content: "Testing",
      },
    ],
  },
];

class Planner extends Component {
  constructor(props) {
    super(props);
  }

  renderWeeks() {
    return weeks.map(({weekNumber, days}) =>
      <PlannerWeek
        weekNumber={weekNumber}
        days={days}
        key={weekNumber}
      />
    );
  }

  render() {
    return (
      <div className="planner">
        { this.renderWeeks() }
      </div>
    );
  }
}

export default Planner;
