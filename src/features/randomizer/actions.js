import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const FetchRandomMeal = mealType => dispatch => {
  return axios.post(`${baseUrl}/meals/random`, { mealType })
    .then(resp => {
      return dispatch({
        "type": "FETCH_RANDOM_MEAL_SUCCESS",
        "payload": resp.data.meal,
      });
    });
};
