import {TFeed, TWSFeedActions} from "../../utils/types";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE
} from "../actions/webSocketActionTypes";

export type TFeedState = {
    wsConnected: boolean,
    orders: Array<TFeed>,
    total: number,
    totalToday: number,
    error: MessageEvent | null,
}

const initialState : TFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
};

export const feedReducer = (state = initialState, action : TWSFeedActions) => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: null,
            };

        case WS_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };

        case WS_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: null,
            };

        case WS_FEED_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                error: null,
            };

        default:
            return state;
    }
};