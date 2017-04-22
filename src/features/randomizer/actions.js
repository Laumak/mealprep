import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const FetchRandomMeal = ({ type = null, toState = true }) => dispatch => {
  return axios.post(`${baseUrl}/meals/random`, { mealType: type })
    .then(resp => {
      if(toState) {
        dispatch({
          "type": "FETCH_RANDOM_MEAL_SUCCESS",
          "payload": resp.data.meal,
        });
      }

      return resp.data.meal;
    });
};
