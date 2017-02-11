import React, { Component, PropTypes } from "react";

import PlannerWeek from "./plannerWeek";
import PlannerStyle from "./planner.scss";

const weeks = [
    {
        weekNumber: 4,
        days: [
            {
                name: "Maanantai",
                content: "Testing",
            }, {
                name: "Tiistai",
                content: "Testing",
            }, {
                name: "Keskiviikko",
                content: "Testing",
            }, {
                name: "Torstai",
                content: "Testing",
            }, {
                name: "Perjantai",
                content: "Testing",
            }, {
                name: "Lauantai",
                content: "Testing",
            }, {
                name: "Sunnuntai",
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
                style={PlannerStyle}
                key={weekNumber}
            />
        );
    }

    render() {
        return(
            <div className="planner">
                { this.renderWeeks() }
            </div>
        );
    }
}

export default Planner;
