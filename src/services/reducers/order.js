import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
} from "../actions";

const initialState = {
    order: {
        orderNumber: 0,
    },
};

export const orderReducer = (state = initialState, action) => {
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
                order: {
                    orderNumber: 0,
                },
            };
        }
        default: {
            return state;
        }
    }
};
