import {ordersReducer} from "./ordersReducer";
import {TOrdersState} from "./ordersReducer";
import {TWSOrderActions} from "../../utils/types";
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_MESSAGE
} from "../actions/webSocketActionTypes";

const initialState : TOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
};

describe('order reducer', () => {
    it('order connection success', () => {
        const state = {...initialState};
        const action: TWSOrderActions = {
            type: WS_ORDERS_CONNECTION_SUCCESS
        };

        const expected = {
            ...state,
            wsConnected: true,
            error: null,
        };

        expect(ordersReducer(state, action)).toEqual(expected);
    });

    it('order connection error', () => {
        const state = {...initialState};
        const action: TWSOrderActions = {
            type: WS_ORDERS_CONNECTION_ERROR,
            payload: new MessageEvent("message", { data: { foo: "bar" }, origin: "whatever.com" })
        };

        const expected = {
            ...state,
            wsConnected: false,
            error: action.payload,
        };

        expect(ordersReducer(state, action)).toEqual(expected);
    });

    it('order connection closed', () => {
        const state = {...initialState};
        const action: TWSOrderActions = {
            type: WS_ORDERS_CONNECTION_CLOSED,
        };

        const expected = {
            ...state,
            wsConnected: false,
            error: null,
        };

        expect(ordersReducer(state, action)).toEqual(expected);
    })

    it('order connection get message', () => {
        const state = {...initialState};
        const action: TWSOrderActions = {
            type: WS_ORDERS_GET_MESSAGE,
            payload: {
                orders: [],
                total: 3,
                totalToday: 9,
                success: true
            },
        };
        const expected = {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            error: null,
        };

        expect(ordersReducer(state, action)).toEqual(expected);
    });
});