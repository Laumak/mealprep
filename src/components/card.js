import React, { PropTypes } from "react";

const propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
};

const Card = ({ title, children }) => {
    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {title}
                </p>
            </header>

            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

Card.propTypes = propTypes;

export default Card;
