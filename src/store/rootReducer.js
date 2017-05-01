import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import meals from "../features/meals/reducer"
import weeks from "../features/planner/reducer"

const rootReducer = combineReducers({
  routing: routerReducer,
  meals,
  weeks,
})

export default rootReducer
