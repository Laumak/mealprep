const initialState = {
  random: {},
  error: null,
};

const RandomMealReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "FETCH_RANDOM_MEAL_SUCCESS": {
      return Object.assign({}, state, { random: payload });
    }
    case "FETCH_RANDOM_MEAL_FAIL": {
      return Object.assign({}, state, { error: payload });
    }
    default: {
      return state;
    }
  }
};

export default RandomMealReducer;
