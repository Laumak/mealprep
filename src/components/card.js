import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const propTypes = {
  title: PropTypes.string,
  id:    PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.any,
  className: PropTypes.string,
  onHeaderClick: PropTypes.func,
};

const Card = ({ title = "Loading...", id, children, className, onHeaderClick }) => {
  const cardClasses = classNames({
    card: true,
    [className]: !!className,
  });

  return (
    <div className={cardClasses}>
      <header className="card-header">
        {
          onHeaderClick ?
            <a className="card-header-title" onClick={() => onHeaderClick(id)}>{title}</a> :
            <p className="card-header-title">{title}</p>
        }
      </header>

      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
