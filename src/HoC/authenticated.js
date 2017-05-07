import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

import { CheckAuthStatus } from "../features/authentication/actions"

import Card from "../components/card"

const Authenticated = (WrappedComponent, protectedRoute = true) => {
  class AuthenticatedHoC extends Component {
    static propTypes = {
      authenticated:   PropTypes.bool.isRequired,
      checkAuthStatus: PropTypes.func.isRequired,
      authError:       PropTypes.string, // eslint-disable-line
    }

    state = {
      loading: false,
    }

    componentDidMount() {
      this.setAuthorizationHeaders()
    }

    componentWillReceiveProps(nextProps) {
      if(!nextProps.authenticated && !nextProps.authError) {
        this.setAuthorizationHeaders()
      }
    }

    setAuthorizationHeaders = () => {
      const token = localStorage.getItem("token")

      if(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
      }

      this.setState({ loading: true })

      this.props.checkAuthStatus()
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false }))
    }

    render() {
      if(this.state.loading) {
        return null
      }

      if(this.props.authenticated || !protectedRoute) {
        return <WrappedComponent { ...this.props } />
      }

      return (
        <div className="unauthorized">
          <Card title="Unauthorized">

            <p>Please <Link to="/login">log in</Link> to see this content.</p>
          </Card>
        </div>
      )
    }
  }

  const mapState = state => ({
    authenticated: state.auth.authenticated,
    authError:     state.auth.error,
  })

  const mapDispatch = dispatch => ({
    checkAuthStatus: () => dispatch(CheckAuthStatus()),
  })

  return connect(mapState, mapDispatch)(AuthenticatedHoC)
}

export default Authenticated
