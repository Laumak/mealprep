import axios from "axios"

import BASE_URL from "../../api/baseUrl"

const API = {
  REGISTER: `${BASE_URL}/register`,
  AUTHENTICATE: `${BASE_URL}/authenticate`,
}

const NO_TOKEN      = "no_token"
const TOKEN_EXPIRED = "token_expired"

export const Register = credentials => dispatch => {
  dispatch({ type: "AUTH_START" })

  return new Promise((resolve, reject) =>
    axios.post(API.REGISTER, { user: credentials })
      .then(resp => {
        localStorage.setItem("token", resp.data.token)

        dispatch({ type: "REGISTER_SUCCESS", payload: resp.data.user })
        return resolve(resp.data.message)
      })
      .catch(resp => {
        const message = resp.response.data.error || "unkown_error"

        dispatch({ type: "REGISTER_FAIL", payload: message })
        return reject(message)
  })
  )
}

export const Authenticate = credentials => dispatch => {
  dispatch({ type: "AUTH_START" })

  return new Promise((resolve, reject) =>
    axios.post(API.AUTHENTICATE, credentials)
      .then(resp => {
        localStorage.setItem("token", resp.data.token)

        dispatch({ type: "AUTH_SUCCESS", payload: resp.data.user })

        return resolve(resp.data.user)
      })
      .catch(error => {
        const payload = error.response.data.error || "unidentified_error"

        dispatch({ type: "AUTH_FAIL", payload })

        return reject(error.response.data.error)
      })
  )
}

export const Logout = () => (dispatch) =>
  new Promise(resolve => {
    localStorage.removeItem("token")
    dispatch({ type: "LOGOUT" })

    return resolve()
  })
