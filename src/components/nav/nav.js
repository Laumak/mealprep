import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes  from "prop-types"
import { Link }   from "react-router-dom"
import classNames from "classnames"

import navigate from "../../utils/navigate"

import { Logout } from "../../features/authentication/actions"

import NavLink from "./navLink"

class Nav extends Component {
  static propTypes = {
    title: PropTypes.string,
    links: PropTypes.array.isRequired,

    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
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

  renderAuthButtons = () => {
    if(this.props.authenticated) {
      return (
        <div className="nav-item">
          <div className="field is-grouped">
            <p className="control">
              <a className="button is-danger" onClick={this.handleLogout}>
                <span className="icon">
                  <i className="fa fa-sign-out"></i>
                </span>
                <span>Logout</span>
              </a>
            </p>
          </div>
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

const connected = connect(mapState, mapDispatch)(Nav)

export default connected
