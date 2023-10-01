import {CombinedState, combineReducers, Reducer} from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import {ordersReducer} from "./ordersReducer";

export const getIngredientsReducer: Reducer<CombinedState<any>> = combineReducers({
    constructorReducer,
    ingredientsReducer,
    ordersReducer
});
