const initialState = {
  authenticated: false,
  user:          {},
  error:         null,
  loading:       false,
}

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case "AUTH_START": {
      return { ...state, loading: true }
    }
    case "AUTH_SUCCESS": {
      return {
        ...state,
          user: payload,
          authenticated: true,
          error: null,
          loading: false,
      }
    }
    case "AUTH_FAIL": {
      return {
        ...state,
        error: payload,
        authenticated: false,
        user: {},
        loading: false,
      }
    }

    case "REGISTER_SUCCESS": {
      return {
        ...state,
        user: payload,
        authenticated: true,
        error: null,
        loading: false,
      }
    }
    case "REGISTER_FAIL": {
      return {
        ...state,
        user: {},
        authenticated: false,
        error: payload,

    case "LOGOUT": {
      return {
        ...state,
          user: {},
          error: null,
          authenticated: false,
      }
    }
        loading: false,
      }
    }

    default: {
      return state
    }
  }
}
