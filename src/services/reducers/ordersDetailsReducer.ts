import {TOrderDetailsActions} from "../../utils/types";
import {GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS} from "../actions/orderDetails";

const initialState = {
    order: null,
};

export const orderDetailsReducer = (
    state = initialState,
    action: TOrderDetailsActions
) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
            };
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                order: action.order
            };
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state
            };
        }
        default: {
            return state;
        }
    }
};
