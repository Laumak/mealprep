import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const NavLink = ({ name, url }) => (
  <Link
    to={url}
    className="nav-item is-tab"
    activeClassName="is-active"
  >
    {name}
  </Link>
);

NavLink.propTypes = propTypes;

export default NavLink;
