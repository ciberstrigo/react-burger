// Получение и обновление номера заказа в модальном окне OrderDetails.
import { receiveOrderNumber } from "../../utils/api";
import {getCookie} from "../../utils/cookies";
import {AppDispatch} from "../../utils/store";
import {AppThunk, TIngredient} from "../../utils/types";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export function applyOrder(ingredients: Array<TIngredient>): AppThunk {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });

        receiveOrderNumber(getCookie("refreshToken"), ingredients)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: data.order.number,
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