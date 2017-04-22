import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import SelectedMealReducer from "../features/meals/reducer";
import RandomMealReducer from "../features/randomizer/reducer";
import WeekReducer from "../features/planner/reducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  selected: SelectedMealReducer,
  random: RandomMealReducer,
  week: WeekReducer,
});

export default rootReducer;
