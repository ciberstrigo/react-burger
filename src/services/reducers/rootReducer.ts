import { combineReducers } from "redux";
import { getIngredientsReducer } from "./index";
import { userReducer } from "./user";
import {Reducer} from "redux";
import {CombinedState} from "redux";
import {orderReducer} from "./order";
import {feedReducer} from "./feedReducer";
import {ordersReducer} from "./ordersReducer";
import {orderDetailsReducer} from "./ordersDetailsReducer";

export const rootReducer: Reducer<CombinedState<any>> = combineReducers({
    burger: getIngredientsReducer,
    user: userReducer,
    order: orderReducer,
    feed: feedReducer,
    userOrders: ordersReducer,
    orderDetail: orderDetailsReducer
});
