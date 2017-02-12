import React, { PropTypes } from "react";
import classNames from "classnames";

const propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string,
    className: PropTypes.any,
    handleOnClick: PropTypes.func,
};

const LoadingButton = (props) => {
    const buttonClasses = classNames({
        [props.className]: true,
        "is-loading": props.loading,
    });

    return(
        <a
            className={buttonClasses}
            onClick={props.handleOnClick}
        >
            { props.text }
        </a>
    );
};

LoadingButton.propTypes = propTypes;

export default LoadingButton;
