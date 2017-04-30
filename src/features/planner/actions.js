import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const SaveDailyMeal = ({ type, dayID, mealID }) => dispatch => {
  return axios.put(`${baseUrl}/dailyMeal/${dayID}`, { type, mealID })
    .then(resp => {
      dispatch(FetchWeek());

      return resp.data.day;
    });
};

export const FetchCurrentWeek = () => dispatch => {
  return axios.get(`${baseUrl}/week`)
    .then(resp => {
      dispatch({
        type: "FETCH_CURRENT_WEEK_SUCCESS",
        payload: resp.data.week,
      });

      return resp.data.week;
    });
};

export const FetchWeek = (number, year) => (dispatch, getState) => {
  if(!number) {
    number = getState().weeks.current.number;
  }

  if(!year) {
    year = new Date().getFullYear();
  }

  return axios.get(`${baseUrl}/week/${number}/${year}`)
    .then(resp => {
      dispatch({
        type: "FETCH_CURRENT_WEEK_SUCCESS",
        payload: resp.data.week,
      });

      return resp.data.week;
    });
};

export const GoToWeek = number => dispatch => {
  return axios.get(`${baseUrl}/week/${number}`)
    .then(resp => {
      dispatch({
        type: "FETCH_CURRENT_WEEK_SUCCESS",
        payload: resp.data.week,
      });

      return resp.data.week;
    });
};
