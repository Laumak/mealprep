const initialState = {
  selected: {},
  random: {},
  all: {
    data: [],
  },
  allz: [],
  loading: false,
  error: null,
};

const MealsReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    // All meals
    case "FETCH_MEALS_SUCCESS": {
      return { ...state, all: payload };
    }

    case "FETCH_ALL_MEALS_SUCCESS": {
      return { ...state, allz: payload };
    }

    // All meals - pagination
    case "FETCH_MORE_MEALS": {
      return { ...state, loading: true };
    }
    case "FETCH_MORE_MEALS_SUCCESS": {
      const meals = state.all.data.concat(payload.data);

      return {
        ...state,
        meals: {
          ...payload,
          data: meals,
        },
        loading: false,
      };
    }

    // Selected meal
    case "FETCH_MEAL_SUCCESS": {
      return { ...state, selected: payload };
    }
    case "FETCH_MEAL_FAIL": {
      return { ...state, error: payload };
    }

    // Random meal
    case "FETCH_RANDOM_MEAL_SUCCESS": {
      return { ...state, random: payload };
    }
    case "FETCH_RANDOM_MEAL_FAIL": {
      return { state, error: payload };
    }

    default: {
      return state;
    }
  }
};

export default MealsReducer;
