import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import classNames from "classnames";

import NavLink from "./navLink";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
  }

  renderMenuLinks(links) {
    return links.map(({ name, url }) =>
      <NavLink
        name={name}
        url={url}
        key={url}
      />
    );
  }

  render() {
    const menuClasses = classNames({
      "nav-right": true,
      "nav-menu": true,
      "is-active": this.state.mobileMenuOpen,
    });

    const toggleClasses = classNames({
      "nav-toggle": true,
      "is-active": this.state.mobileMenuOpen,
    });

    return(
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <Link to="/" className="nav-item is-brand">
              <h2 className="title">{this.props.title}</h2>
            </Link>
          </div>

          <span className={toggleClasses} onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className={menuClasses}>
            { this.renderMenuLinks(this.props.links) }
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array.isRequired,
};

export default Nav;
