import React from "react"
import PropTypes from "prop-types"
import { NavLink as RouterLink } from "react-router-dom"

import CSSModules from "react-css-modules"
import styles     from "./nav.sass"

const propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired,
}

const NavLink = ({ name, url, toggleNav }) => {
  debugger
  return (
    <RouterLink
      to={url}
      onClick={toggleNav}
      className="nav-item is-tab"
      activeClassName={"is-active"}
    >
      {name}
    </RouterLink>
  )
}


NavLink.propTypes = propTypes

const styled = CSSModules(NavLink, styles, { allowMultiple: true })

export default styled
