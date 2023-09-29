import {CombinedState, combineReducers, Reducer} from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";

export const getIngredientsReducer: Reducer<CombinedState<any>> = combineReducers({
    constructorReducer,
    ingredientsReducer,
    orderReducer,
});
