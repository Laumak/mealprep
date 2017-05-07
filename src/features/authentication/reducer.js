const initialState = {
  user:          {},
  error:         null,
  authenticated: false,
  loading:       false,
}

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case "AUTH_START": {
      return { ...state, loading: true }
    }

    // Authenticate (login)
    case "AUTH_SUCCESS": {
      return {
        ...state,
        user: payload,
        error: null,
        authenticated: true,
        loading: false,
      }
    }
    case "AUTH_FAIL": {
      return {
        ...state,
        user: {},
        error: payload,
        authenticated: false,
        loading: false,
      }
    }

    // Register
    case "REGISTER_SUCCESS": {
      return {
        ...state,
        user: payload,
        error: null,
        authenticated: true,
        loading: false,
      }
    }
    case "REGISTER_FAIL": {
      return {
        ...state,
        user: {},
        error: payload,
        authenticated: false,
        loading: false,
      }
    }

    case "LOGOUT": {
      return {
        ...state,
          user: {},
          error: null,
          authenticated: false,
      }
    }

    // Check the user's auth status on page load
    case "AUTH_CHECK_SUCCESS": {
      return {
        ...state,
        user: payload,
        error: null,
        authenticated: true,
        loading: false,
      }
    }
    case "AUTH_CHECK_FAIL": {
      return {
        ...state,
        user: {},
        error: null,
        authenticated: false,
        errorMessage: null,
        loading: false,
      }
    }

    default: {
      return state
    }
  }
}
