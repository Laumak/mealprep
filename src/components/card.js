import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

const Card = ({ title = "Loading...", children, className }) => {
  const cardClasses = classNames({
    card: true,
    [className]: !!className,
  });

  return(
    <div className={cardClasses}>
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
