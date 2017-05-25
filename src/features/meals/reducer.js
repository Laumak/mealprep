const initialState = {
  selected: {},
  random: {},
  all: [],
  paginated: {
    data: [],
  },
  loading: false,
  error: null,
};

const MealsReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    // All meals
    case "FETCH_PAGINATED_MEALS_SUCCESS": {
      return { ...state, paginated: payload };
    }

    case "FETCH_ALL_MEALS_SUCCESS": {
      return { ...state, all: payload };
    }

    // All meals - pagination
    case "FETCH_MORE_MEALS": {
      return { ...state, loading: true };
    }
    case "FETCH_MORE_MEALS_SUCCESS": {
      const meals = state.all.data.concat(payload.data);

      const newState = {
        ...state,
        paginated: {
          ...payload,
          data: meals,
        },
        loading: false,
      }

      return newState
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

    case "DELETE_MEAL_SUCCESS": {
      const newAll       = state.all.filter(meal => meal.id !== payload)
      const newPaginated = state.paginated.data.filter(meal => meal.id !== payload)

      return {
        ...state,
          all: newAll,
          paginated: { ...state.paginated, data: newPaginated },
      };
    }

    default: {
      return state;
    }
  }
};

export default MealsReducer;
