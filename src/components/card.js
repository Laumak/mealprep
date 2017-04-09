import React from "react";
import PropTypes from "prop-types";

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
