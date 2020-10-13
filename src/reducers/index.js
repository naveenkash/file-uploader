import { isLoggedIn } from "./Auth";
import { user } from "./User";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: isLoggedIn,
  user,
});

export default allReducers;
