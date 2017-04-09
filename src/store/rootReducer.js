import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import randomMeal from "../features/randomizer/reducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  meal: randomMeal,
});

export default rootReducer;
