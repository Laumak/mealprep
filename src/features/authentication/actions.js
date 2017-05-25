import axios from "axios"

import BASE_URL from "../../api/baseUrl"

import checkForValidToken, { types } from "../../utils/checkForValidToken"

const API = {
  REGISTER: `${BASE_URL}/register`,
  AUTHENTICATE: `${BASE_URL}/authenticate`,
  CHECK_AUTH_STATUS: `${BASE_URL}/checkAuthStatus`,
}

export const CheckAuthStatus = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if(getState().auth.loading) {
      return resolve()
    }

    dispatch({ type: "AUTH_CHECK_START" })

    let payload = {}

    const tokenState = checkForValidToken()

    if(tokenState === types.NO_TOKEN || tokenState === types.TOKEN_EXPIRED) {
      if(tokenState === types.TOKEN_EXPIRED) {
        localStorage.removeItem("token")
      }

      dispatch({ type: "AUTH_CHECK_FAIL" })

      return reject(tokenState)
    }

    // Token is found and it's not expired -> check at the server.
    axios.post(API.CHECK_AUTH_STATUS)
      // Token is valid and checks out at the server.
      .then(response => {
        payload = response.data.user
        dispatch({ type: "AUTH_CHECK_SUCCESS", payload })

        return resolve(response.data.user)
      })

      // Token checking fails at the server.
      .catch(({ response }) => {
        // If the token is expired, remove the expired token and ask the user to log back in.
        if(response.data.error === types.TOKEN_EXPIRED) {
          localStorage.removeItem("token")
        }

        dispatch({ type: "AUTH_CHECK_FAIL" })
        return reject(response.data.error)
      })
  })
}

export const Register = credentials => dispatch => {
  dispatch({ type: "AUTH_START" })

  return new Promise((resolve, reject) =>
    axios.post(API.REGISTER, { user: credentials })
      .then(resp => {
        const token = resp.data.token
        localStorage.setItem("token", token)

        axios.defaults.headers.common.Authorization = `Bearer ${token}`

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
        const token = resp.data.token
        localStorage.setItem("token", token)

        axios.defaults.headers.common.Authorization = `Bearer ${token}`

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
