import {orderReducer} from "./order";
import {TOrderActions} from "../../utils/types";
import {
    CLEAN_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../actions/applyOrder";

const initialState = {
    order: {
        orderNumber: 0,
    },
};


describe('order reducer', () => {
    it('Get order number request', () => {
        const state = {...initialState};
        const action: TOrderActions = {
            type: GET_ORDER_NUMBER_REQUEST
        };
        const expected = {...state};
        expect(orderReducer(state, action)).toEqual(expected);
    });

    it('Get order number success', () => {
        const state = {...initialState};
        const action: TOrderActions = {
            type: GET_ORDER_NUMBER_SUCCESS,
            orderNumber: Math.random()
        };
        const expected = {
            ...state,
            order: {
                ...state.order,
                orderNumber: action.orderNumber
            }
        };
        expect(orderReducer(state, action)).toEqual(expected);
    });

    it('Get order number failed', () =>{
        const state = {...initialState};
        const action: TOrderActions = {
            type: GET_ORDER_NUMBER_FAILED,
        };

        const expected = {
            ...state,
            ...initialState
        };

        expect(orderReducer(state, action)).toEqual(expected);
    });

    it('Clean order number', () => {
        const state = {...initialState};
        const action: TOrderActions = {
            type: CLEAN_ORDER_NUMBER,
        };

        const expected = {
            ...state,
            order: {}
        };

        expect(orderReducer(state, action)).toEqual(expected);
    });
});