import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";

const propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

const NavLink = ({ name, url, toggleNav }) => (
  <RouterLink
    to={url}
    onClick={toggleNav}
    className="nav-item is-tab"
    activeClassName="is-active"
  >
    {name}
  </RouterLink>
);

NavLink.propTypes = propTypes;

export default NavLink;
