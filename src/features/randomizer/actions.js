import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const FetchRandomMeal = ({ type = null, toState = true }) => dispatch => {
  const url = type ? `${baseUrl}/meals/random/${type}` : `${baseUrl}/meals/random`

  return axios.get(url)
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
