import {feedReducer, TFeedState} from "./feedReducer";
import {TWSFeedActions} from "../../utils/types";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE
} from "../actions/webSocketActionTypes";

const initialState : TFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
};

describe('feedReducer testing', () => {
    it('connection success', () => {
        const state = {...initialState};
        const action: TWSFeedActions = {
            type: WS_FEED_CONNECTION_SUCCESS
        };

        expect(feedReducer(state, action)).toEqual({
            ...initialState,
            wsConnected: true,
            error: null,
        });
    });

    it('connection error', () => {
        const state = {...initialState};
        const action: TWSFeedActions = {
            type: WS_FEED_CONNECTION_ERROR,
            payload: new MessageEvent("message", { data: { foo: "bar" }, origin: "whatever.com" })
        };

        expect(feedReducer(state, action)).toEqual({
            ...initialState,
            wsConnected: false,
            error: new MessageEvent("message", { data: { foo: "bar" }, origin: "whatever.com" }),
        });
    });


    it('connection closed', () => {
       const state = {...initialState};
       const action: TWSFeedActions = {
           type: WS_FEED_CONNECTION_CLOSED,
       };

       expect(feedReducer(state, action)).toEqual({
           ...state,
           wsConnected: false,
           error: null,
       });
    });


    it('get message', () => {
        const state = {...initialState};
        const action: TWSFeedActions = {
            type: WS_FEED_GET_MESSAGE,
            payload: {
                orders: [],
                total: 0,
                totalToday: 0,
                success: true
            }
        };

        expect(feedReducer(state, action)).toEqual({
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            error: null,
        });
    });
});