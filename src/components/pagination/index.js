import React from "react";
import PropTypes  from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import { ChangePage } from "./actions";

const propTypes = {
  changePage: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string,
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: false,
};

const Pagination = props => {
  const nextPage = () => props.changePage(props.nextPageUrl);

  const buttonClasses = classNames({
    button: true,
    "is-primary": true,
    "is-loading": props.loading,
  });

  return (
    <nav className="pagination is-centered">
      <button
        className={buttonClasses}
        onClick={nextPage}
        disabled={!props.nextPageUrl}
      >
        Load more meals
      </button>
    </nav>
  );
};

Pagination.propTypes    = propTypes;
Pagination.defaultProps = defaultProps;

const mapDispatch = dispatch => ({
  changePage: url => dispatch(ChangePage(url)),
});

export default connect(null, mapDispatch)(Pagination);
