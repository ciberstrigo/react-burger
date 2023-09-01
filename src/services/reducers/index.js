import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";

export const getIngredientsReducer = combineReducers({
    constructorReducer,
    ingredientsReducer,
    orderReducer,
});
