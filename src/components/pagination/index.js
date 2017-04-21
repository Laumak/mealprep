import React from "react";
import PropTypes  from "prop-types";
import { connect } from "react-redux";

import { ChangePage } from "./actions";

const propTypes = {
  changePage: PropTypes.func.isRequired,
  prevPageUrl: PropTypes.string,
  nextPageUrl: PropTypes.string,
};

const Pagination = props => {
  const prevPage = () => props.changePage(props.prevPageUrl);
  const nextPage = () => props.changePage(props.nextPageUrl);

  return (
    <nav className="pagination is-centered">
      <a
        className="pagination-previous"
        onClick={prevPage}
        disabled={!props.prevPageUrl}
      >
        Previous
      </a>

      <a
        className="pagination-next"
        onClick={nextPage}
        disabled={!props.nextPageUrl}
      >
        Next
      </a>
    </nav>
  );
};

Pagination.propTypes = propTypes;

const mapDispatch = dispatch => {
  return {
    changePage: (url) => dispatch(ChangePage(url)),
  };
};

export default connect(null, mapDispatch)(Pagination);
