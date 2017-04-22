import axios from "axios";
import baseUrl from "../../api/baseUrl";

export const SaveDailyMeal = ({ type, dayID, mealID }) => dispatch => {
  return axios.put(`${baseUrl}/dailyMeal/${dayID}`, { type, mealID })
    .then(resp => {
      dispatch(FetchCurrentWeek());

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
