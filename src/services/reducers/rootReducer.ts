import { combineReducers } from "redux";
import { getIngredientsReducer } from "./index";
import { userReducer } from "./user";
import {Reducer} from "redux";
import {CombinedState} from "redux";

export const rootReducer: Reducer<CombinedState<any>> = combineReducers({
    burger: getIngredientsReducer,
    user: userReducer,
});
