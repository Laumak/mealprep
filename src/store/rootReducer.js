import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import meals from "../features/meals/reducer"
import weeks from "../features/planner/reducer"
import auth from "../features/authentication/reducer"

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  meals,
  weeks,
})

export default rootReducer
