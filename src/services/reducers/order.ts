import {
    CLEAN_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
} from "../actions/applyOrder";
import {TOrderActions} from "../../utils/types";

const initialState = {
    order: {
        orderNumber: 0,
    },
};

export const orderReducer = (
    state = initialState,
    action: TOrderActions
) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                order: {
                    ...state.order,
                    orderNumber: action.orderNumber,
                },
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                ...initialState
            };
        }
        case CLEAN_ORDER_NUMBER: {
            return {
                ...state,
                order: {}
            };
        }
        default: {
            return state;
        }
    }
};
