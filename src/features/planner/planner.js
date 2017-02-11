import React, { Component, PropTypes } from "react";

import PlannerWeek from "./plannerWeek";
import PlannerStyle from "./planner.scss";

class Planner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <PlannerWeek
                style={PlannerStyle}
                weekNumber={4}
            />
        );
    }
}

export default Planner;
