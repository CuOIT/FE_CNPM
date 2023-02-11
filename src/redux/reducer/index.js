import { combineReducers } from "redux";
import { AuthReducer } from "./Auth";

const rootReducer = combineReducers({
    AuthReducer,
});
export default rootReducer;
