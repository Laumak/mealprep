const initialState = {
  current: {
    number: null,
    days: [],
  },
  error: null,
};

const CurrentWeekReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "FETCH_CURRENT_WEEK_SUCCESS": {
      return Object.assign({}, state, { current: payload });
    }
    default: {
      return state;
    }
  }
};

export default CurrentWeekReducer;
