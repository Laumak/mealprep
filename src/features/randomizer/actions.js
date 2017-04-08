import axios from "axios";

const baseUrl = "http://api.mealprep.dev/v0";

export const FetchRandomMeal = () => dispatch => {
  return axios.get(`${baseUrl}/meals/random`)
    .then(resp => {
      return dispatch({
        "type": "FETCH_RANDOM_MEAL_SUCCESS",
        "payload": resp.data.meal,
      });
    });
};
