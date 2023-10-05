import {orderDetailsReducer} from "./ordersDetailsReducer";
import {TOrderDetailsActions} from "../../utils/types";
import {GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS} from "../actions/orderDetails";


const initialState = {
    order: null,
};

describe('order details reducer', () => {
    it('get order detail requests', () => {
        const state = {...initialState};
        const action: TOrderDetailsActions = {
            type: GET_ORDER_DETAILS_REQUEST
        };
        const expected = {...state};

        expect(orderDetailsReducer(state, action)).toEqual(expected);
    });

    it('get order detail success', () => {
        const state = {...initialState};
        const action: TOrderDetailsActions = {
            type: GET_ORDER_DETAILS_SUCCESS,
            order: {x: 1, y: 2}
        };
        const expected = {
            ...state,
            order: action.order
        };

        expect(orderDetailsReducer(state, action)).toEqual(expected);
    });

    it('get order detail failed', () => {
        const state = {...initialState};
        const action: TOrderDetailsActions = {
            type: GET_ORDER_DETAILS_FAILED,
        };
        const expected = {
            ...state
        };

        expect(orderDetailsReducer(state, action)).toEqual(expected);
    });
});