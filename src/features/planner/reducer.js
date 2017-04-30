const initialState = {
  current: {
    number: null,
    days: [],
  },
  all: [],
  error: null,
};

const WeekReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "FETCH_CURRENT_WEEK_SUCCESS": {
      return Object.assign({}, state, { current: payload });
    }
    case "FETCH_ALL_WEEKS_SUCCESS": {
      return {
        ...state,
        all: [ ...payload ],
      };
    }
    default: {
      return state;
    }
  }
};

export default WeekReducer;
