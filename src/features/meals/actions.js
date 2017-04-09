import axios from "axios";

const baseUrl = "http://api.mealprep.dev/v0";

export const FetchMeal = id => dispatch => {
  return axios.get(`${baseUrl}/meals/${id}`)
    .then(resp => {
      return dispatch({
        type: "FETCH_MEAL_SUCCESS",
        payload: resp.data.meal,
      });
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_MEAL_FAIL",
        payload: error,
      });
    });
};

export const StoreMeal = meal => () => {
  return axios.post(`${baseUrl}/meals`, meal);
};
