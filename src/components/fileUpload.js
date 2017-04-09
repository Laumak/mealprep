import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired,
  handleFileChange: PropTypes.func.isRequired,
};

const FileUpload = (props) => {
  return(
    <input
      type="file"
      name={props.name}
      onChange={props.handleFileChange}
    />
  );
};

FileUpload.propTypes = propTypes;

export default FileUpload;
