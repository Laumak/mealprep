import axios from "axios"

import BASE_URL from "../../api/baseUrl"

const API = {
  AUTHENTICATE: `${BASE_URL}/authenticate`,
}

const NO_TOKEN      = "no_token"
const TOKEN_EXPIRED = "token_expired"

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

