import axios from "axios"
import jwt_decode from "jwt-decode"

export const types = {
  NO_TOKEN: "no_token",
  TOKEN_EXPIRED: "token_expired",
  VALID: "valid",
}

const checkForValidToken = () => {
  const token = localStorage.getItem("token")

  // If a token is not stored in localStorage, just stop processing.
  if(!token)
    return types.NO_TOKEN

  const isExpired = jwt_decode(token).exp > new Date().getTime()

  // If a token is found, but it is expired, no need to go further with the checking.
  if(isExpired)
    return types.TOKEN_EXPIRED

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  return types.VALID
}

export default checkForValidToken
