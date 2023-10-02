// Получение и обновление номера заказа в модальном окне OrderDetails.
import {receiveOrderNumber} from "../../utils/api";
import {getCookie} from "../../utils/cookies";
import {AppDispatch} from "../../utils/store";
import {AppThunk, TIngredient} from "../../utils/types";
import {CLEAN_CONSTRUCTOR} from "./constructor";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export const applyOrder: AppThunk = (ingredients: Array<TIngredient>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });

        receiveOrderNumber(getCookie("accessToken"), ingredients)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: data.order.number,
                });
                dispatch({
                    type: CLEAN_CONSTRUCTOR
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                });
                console.error("Error:", error);
            });
    };
}
