import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

const Loader = (props) => {
  return props.loading
    ? <p>Loading...</p>
    : props.children;
};

Loader.propTypes = propTypes;

export default Loader;
