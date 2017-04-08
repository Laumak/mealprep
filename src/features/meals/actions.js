import axios from "axios";

const baseUrl = "http://api.mealprep.dev/v0";

export const StoreMeal = meal => dispatch => {
  return axios.post(`${baseUrl}/meals`, meal);
};
