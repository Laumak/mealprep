import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes  from "prop-types"
import { Link, withRouter }   from "react-router-dom"
import classNames from "classnames"

import AuthStatusHoC from "../../HoC/authenticated"

import navigate from "../../utils/navigate"

import { Logout } from "../../features/authentication/actions"

import NavLink from "./components/navLink"

class Nav extends Component {
  static propTypes = {
    title: PropTypes.string,
    links: PropTypes.array.isRequired,

    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    }),
  }

  state = {
    dropdownOpen:   false,
    mobileMenuOpen: false,
  }

  toggleNav = () => this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })

  handleLogout = () =>
    this.props.logout()
      .then(() => {
        this.toggleNav()

        navigate("/login", this.context)
      })

  renderMenuLinks = links => {
    return links.map(({ name, url, auth }) => {
      if(auth && !this.props.authenticated) {
        return null
      }

      return (
        <NavLink
          name={name}
          url={url}
          toggleNav={this.toggleNav}
          key={url}
        />
      )
    })
  }

  openTing = () => {

  }

  renderAuthButtons = () => {
    if(this.props.authenticated) {
      return (
        <div className={`nav-item profile ${this.state.dropdownOpen ? "open" : ""}`}>
          <figure className="image" onClick={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
            <img src="http://placehold.it/64x64" />
          </figure>
        </div>
      )
    }

    return (
      <div className="nav-item">
        <div className="field is-grouped">
          <p className="control">
            <Link
              to="/login"
              className="button is-success"
              onClick={this.toggleNav}
            >
              <span className="icon">
                <i className="fa fa-sign-in"></i>
              </span>
              <span>Login</span>
            </Link>
          </p>
        </div>
      </div>
    )
  }

  render() {
    const menuClasses = classNames({
      "nav-right": true,
      "nav-menu": true,
      "is-active": this.state.mobileMenuOpen,
    })

    const toggleClasses = classNames({
      "nav-toggle": true,
      "is-active": this.state.mobileMenuOpen,
    })

    const logoURL = this.props.authenticated ? "/" : "/randomizer"

    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <Link to={logoURL} className="nav-item is-brand">
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

            { this.renderAuthButtons() }

            <ul className={`box dropdown ${this.state.dropdownOpen ? "open" : ""}`}>
              <li className="item" onClick={() => this.setState({ dropdownOpen: false, mobileMenuOpen: false })}>
                <Link to="/profile">
                  View profile
                </Link>
              </li>

              <li className="item no-bg">
                <a className="button is-danger is-small" onClick={this.handleLogout}>
                  <span className="icon is-small">
                    <i className="fa fa-sign-out"></i>
                  </span>
                  <span>Logout</span>
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    )
  }
}

const mapState = state => ({
  authenticated: state.auth.authenticated,
})

const mapDispatch = dispatch => ({
  logout: () => dispatch(Logout()),
})

const connected = connect(
  mapState, mapDispatch
)(AuthStatusHoC(Nav, false))

// https://github.com/ReactTraining/react-router/issues/4638#issuecomment-305036617
const routed = withRouter(connected)

export default routed
