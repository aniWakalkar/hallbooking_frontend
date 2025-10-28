import { combineReducers } from "redux";
import userReducer from "./reducers";

const rootReducer = combineReducers({
  userAuth: userReducer,
});

export default rootReducer;
