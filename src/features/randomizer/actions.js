import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const FetchRandomMeal = () => dispatch => {
  return axios.get(`${baseUrl}/meals/random`)
    .then(resp => {
      return dispatch({
        "type": "FETCH_RANDOM_MEAL_SUCCESS",
        "payload": resp.data.meal,
      });
    });
};
