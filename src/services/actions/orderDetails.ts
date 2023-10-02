import {AppThunk} from "../../utils/types";

import {AppDispatch} from "../../utils/store";
import {receiveIngredient} from "../../utils/api";

export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";

export const getOrderDetails: AppThunk = (number: number) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST,
        });

        receiveIngredient(number)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_DETAILS_SUCCESS,
                    order: data.orders[0],
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED,
                });
                console.error("Error:", error);
            });
    };
}
