import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classNames from "classnames"

import { Authenticate } from "../actions"

import navigate from "../../../utils/navigate"

import Card from "../../../components/card"
import Input from "../../../components/form/input"
import Message from "../../../components/message"

class LoginPage extends Component {
  static propTypes = {
    authenticate:  PropTypes.func.isRequired,
    // authenticated: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    email:    "",
    password: "",
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.authenticated) {
  //     browserHistory.push("/form")
  //   }

  //   // TODO: Show notification: "Welcome back".
  // }

  handleOnChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleOnSubmit = e => {
    e.preventDefault()

    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.authenticate(loginInfo)
      .then(resp => {
        if(!resp) return

        return navigate("/planner", this.context)
      })
  }

  render() {
      const buttonClasses = classNames({
        "button":     true,
        "is-success": true,
        "is-loading": this.props.loading,
      })

      return (
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <Card title="Login">

              <div className="login-page columns">
                <div className="column is-8 is-offset-2">

                  <Message title="Error" className="is-danger" visible={!!this.props.error}>
                    <p>An error occured while trying to log you in.</p>
                    <p>Please try again.</p>
                  </Message>

                  <form autoComplete="off" onSubmit={e => this.handleOnSubmit(e)}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleOnChange}
                      icon="fa-user"
                    />

                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleOnChange}
                      icon="fa-lock"
                    />

                    <button
                      type="submit"
                      className={buttonClasses}
                      disabled={this.props.loading}
                    >
                      Login
                    </button>
                  </form>

                </div>
              </div>

            </Card>
          </div>
        </div>
      )
  }
}

const mapState = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error,
  loading: state.auth.loading,
})

const mapDispatch = dispatch => ({
  authenticate: values => dispatch(Authenticate(values)),
})

export default connect(mapState, mapDispatch)(LoginPage)
