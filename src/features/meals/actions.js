import axios from "axios"
import baseUrl from "../../api/baseUrl"

import { FetchWeek } from "../planner/actions"

export const FetchMeals = () => dispatch => {
  dispatch({ type: "FETCH_PAGINATED_MEALS_START" })

  return axios.get(`${baseUrl}/meals`)
    .then(resp => {
      return dispatch({
        type: "FETCH_PAGINATED_MEALS_SUCCESS",
        payload: resp.data.meals,
      })
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_PAGINATED_MEALS_FAIL",
        payload: error,
      })
    })
}

export const FetchAllMeals = () => dispatch => {
  dispatch({ type: "FETCH_ALL_MEALS_START" })

  return axios.get(`${baseUrl}/meals/all`)
    .then(resp => {
      return dispatch({
        type: "FETCH_ALL_MEALS_SUCCESS",
        payload: resp.data.meals,
      })
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_ALL_MEALS_FAIL",
        payload: error,
      })
    })
}

export const FetchMeal = id => dispatch => {
  dispatch({ type: "FETCH_MEAL_START" })

  return axios.get(`${baseUrl}/meals/${id}`)
    .then(resp => {
      dispatch({
        type: "FETCH_MEAL_SUCCESS",
        payload: resp.data.meal,
      })

      return resp.data.meal
    })
    .catch(error => {
      return dispatch({
        type: "FETCH_MEAL_FAIL",
        payload: error,
      })
    })
}

export const StoreMeal = (meal, file) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/meals`, meal)
      // Meal created succesfully
      .then(resp => {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        if(file) {
          // Attach files
          return axios.post(`${baseUrl}/files/${resp.data.meal.id}`, file, config)
            // File upload successful
            .then(() => {
              return resolve(resp.data.meal)
            })
            // File upload failed
            .catch(() => {
              return reject("fail")
            })
        }

        // No files to attach
        return resolve(resp.data.meal);
      })
  })
}

export const EditMeal = meal => dispatch => {
  return axios.put(`${baseUrl}/meals/${meal.id}`, { meal })
    .then(resp => {
      dispatch(FetchMeals())

      return resp.data.meal
    })
    .catch(error => {
      dispatch({
        type: "EDIT_MEAL_FAIL",
        payload: error,
      })

      return error
    })
}

export const DeleteMeal = id => dispatch => {
  dispatch({ type: "DELETE_MEAL_START" })

  return axios.delete(`${baseUrl}/meals/${id}`)
    .then(resp => {
      return dispatch({
        type: "DELETE_MEAL_SUCCESS",
        payload: resp.data.deletedMeal,
      })
    })
    .catch(error => {
      return dispatch({
        type: "DELETE_MEAL_FAIL",
        payload: error,
      })
    })
}

export const DissociateMeal = ({ dayID, type }) => dispatch =>
  axios.post(`${baseUrl}/meals/${dayID}/${type}`)
    .then(resp => dispatch(FetchWeek(resp.data.week.number)))
