import React, { PropTypes } from "react";

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
