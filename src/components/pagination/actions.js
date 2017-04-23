import axios from "axios";

export const ChangePage = url => dispatch => {
  return axios.get(url)
    .then(resp => {
      dispatch({ type: "FETCH_MORE_MEALS"}); // loading...
      return dispatch({
        type: "FETCH_MORE_MEALS_SUCCESS",
        payload: resp.data.meals,
      });
    })
    .catch(error => {
      dispatch({ type: "FETCH_MORE_MEALS_FAIL", payload: error });
    });
};
