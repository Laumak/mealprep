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
  headerButtonText: PropTypes.string,
};

const Card = ({
  title = "Loading...",
  id, children, className,
  onHeaderClick, headerButtonText,
}) => {
  const cardClasses = classNames({
    card: true,
    [className]: !!className,
  });

  const renderHeaderContent = () => {
    // Header has a clickable button
    if(onHeaderClick && headerButtonText) {
      return (
        <p className="card-header-title">
          <span>{ title }</span>

          <button
            className="button is-warning is-small"
            onClick={() => onHeaderClick(id)}
          >
            {headerButtonText}
          </button>
        </p>
      )
    }

    // Header itself is clickable
    if(onHeaderClick) {
      return (
        <a className="card-header-title" onClick={() => onHeaderClick(id)}>
          { title }
        </a>
      )
    }

    return (
      <p className="card-header-title">
        <span>{ title }</span>
      </p>
    )
  }

  return (
    <div className={cardClasses}>
      <header className="card-header">
        { renderHeaderContent() }
      </header>

      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
