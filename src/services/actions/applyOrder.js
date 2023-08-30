// Получение и обновление номера заказа в модальном окне OrderDetails.
import { recieveOrderNumber } from "../../utils/api";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export function applyOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });

        recieveOrderNumber(ingredients)
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
