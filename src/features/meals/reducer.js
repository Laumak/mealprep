const initialState = {
  meal: {},
  meals: {
    data: [],
  },
  error: null,
};

const SelectedMealReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "FETCH_MEALS_SUCCESS": {
      return Object.assign({}, state, { meals: payload });
    }
    case "FETCH_MEAL_SUCCESS": {
      return Object.assign({}, state, { meal: payload });
    }
    case "FETCH_MEAL_FAIL": {
      return Object.assign({}, state, { error: payload });
    }
    default: {
      return state;
    }
  }
};

export default SelectedMealReducer;
