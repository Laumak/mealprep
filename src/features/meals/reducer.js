const initialState = {
  meal: {},
  meals: {
    data: [],
  },
  error: null,
  loading: false,
};

const SelectedMealReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case "FETCH_MEALS_SUCCESS": {
      return Object.assign({}, state, { meals: payload });
    }
    case "FETCH_MORE_MEALS": {
      return { ...state, loading: true };
    }
    case "FETCH_MORE_MEALS_SUCCESS": {
      const meals = state.meals.data.concat(payload.data);

      return {
        ...state,
        meals: {
          ...payload,
          data: meals,
        },
        loading: false,
      };
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
