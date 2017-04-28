import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const FetchMeals = () => dispatch => {
  return axios.get(`${baseUrl}/meals`)
    .then(resp => {
      return dispatch({
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

export const FetchMeal = id => dispatch => {
  return axios.get(`${baseUrl}/meals/${id}`)
    .then(resp => {
      dispatch({
        type: "FETCH_MEAL_SUCCESS",
        payload: resp.data.meal,
      });

      return resp.data.meal;
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_MEAL_FAIL",
        payload: error,
      });
    });
};

export const StoreMeal = meal => dispatch => {
  return axios.post(`${baseUrl}/meals`, meal)
    .then(resp => {
      dispatch(FetchMeals());

      return resp.data.meal;
    });
};

export const EditMeal = meal => dispatch => {
  return axios.put(`${baseUrl}/meals/${meal.id}`, { meal })
    .then(resp => {
      dispatch(FetchMeals());

      return resp.data.meal;
    })
    .catch(error => {
      dispatch({
        type: "EDIT_MEAL_FAIL",
        payload: error,
      });

      return error;
    });
};

export const DeleteMeal = id => dispatch => {
  return axios.delete(`${baseUrl}/meals/${id}`)
    .then(resp => {
      dispatch(FetchMeals());

      return resp.data.meal;
    })
    .catch(error => {
      return dispatch({
        type: "DELETE_MEAL_FAIL",
        payload: error,
      });
    });
};
