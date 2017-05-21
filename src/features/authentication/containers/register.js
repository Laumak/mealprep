import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classNames from "classnames"

import { Register } from "../actions"

import navigate from "../../../utils/navigate"

import Card from "../../../components/card"
import Input from "../../../components/form/input"
import Message from "../../../components/message"

class LoginPage extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    error:    PropTypes.string,
    loading:  PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    }),
  }

  state = {
    name:       "",
    email:      "",
    password:   "",
    passwordRe: "",
  }

  handleOnChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleOnSubmit = e => {
    e.preventDefault()

    const userInfo = {
      name:     this.state.name,
      email:    this.state.email,
      password: this.state.password,
    }

    this.props.register(userInfo)
      .then(() => navigate("/planner", this.context))
  }

  render() {
      const buttonClasses = classNames({
        "button":     true,
        "is-success": true,
        "is-loading": this.props.loading,
      })

      return (
        <Card title="Register">

          <div className="register-page columns">
            <div className="column is-8 is-offset-2">

              <Message title="Error" className="is-danger" visible={!!this.props.error}>
                <p>An error occured while creating an account.</p>
                <p>Please try again.</p>
              </Message>

              <form autoComplete="off" onSubmit={e => this.handleOnSubmit(e)}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={this.handleOnChange}
                  icon="fa-user"
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  icon="fa-envelope"
                />

                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  icon="fa-lock"
                />

                <Input
                  type="password"
                  name="passwordRe"
                  placeholder="Password Again"
                  onChange={this.handleOnChange}
                  icon="fa-lock"
                />

                <button
                  type="submit"
                  className={buttonClasses}
                  disabled={this.props.loading}
                >
                  Register
                </button>
              </form>

            </div>
          </div>

        </Card>
      )
  }
}

const mapState = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
})

const mapDispatch = dispatch => ({
  register: values => dispatch(Register(values)),
})

export default connect(mapState, mapDispatch)(LoginPage)
