import axios from "axios";

export const ChangePage = url => dispatch => {
  return axios.get(url)
    .then(resp => {
      dispatch({
        type: "FETCH_MEALS_SUCCESS",
        payload: resp.data.meals,
      });
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_MEALS_FAIL",
        payload: error,
      });
    });
};
