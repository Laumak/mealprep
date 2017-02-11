import React, { PropTypes } from "react";

import PlannerDay from "./plannerDay";

const propTypes = {
    weekNumber: PropTypes.number.isRequired,
};

const PlannerWeek = ({ weekNumber }) => {
    return(
        <div>
            <h2 className="title is-3">Viikko {weekNumber}</h2>

            <div className="columns is-multiline">
                <PlannerDay
                    day="Maanantai"
                    content="Stuff"
                />

                <PlannerDay
                    day="Tiistai"
                    content="Stuff"
                />

                <PlannerDay
                    day="Keskiviikko"
                    content="Stuff"
                />

                <PlannerDay
                    day="Torstai"
                    content="Stuff"
                />

                <PlannerDay
                    day="Perjantai"
                    content="Stuff"
                />

                <PlannerDay
                    day="Lauantai"
                    content="Stuff"
                />

                <PlannerDay
                    day="Sunnuntai"
                    content="Stuff"
                />
            </div>
        </div>
    );
};

PlannerWeek.propTypes = propTypes;

export default PlannerWeek;
