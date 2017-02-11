import React, { PropTypes } from "react";

const propTypes = {
    day: PropTypes.string,
    content: PropTypes.string,
};

const PlannerDay = ({ day, content }) => {
    return(
        <div className="column is-one-third">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {day}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

PlannerDay.propTypes = propTypes;

export default PlannerDay;
