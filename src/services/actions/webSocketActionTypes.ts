export const WS_FEED_CONNECTION_START = "WS_FEED_CONNECTION_START";
export const WS_FEED_CONNECTION_SUCCESS = "WS_FEED_CONNECTION_SUCCESS";
export const WS_FEED_CONNECTION_ERROR = "WS_FEED_CONNECTION_ERROR";
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE = "WS_FEED_GET_MESSAGE";
export const WS_FEED_SEND_MESSAGE = "WS_FEED_SEND_MESSAGE";

export const WS_ORDERS_CONNECTION_START = "WS_ORDERS_CONNECTION_START";
export const WS_ORDERS_CONNECTION_SUCCESS = "WS_ORDERS_CONNECTION_SUCCESS";
export const WS_ORDERS_CONNECTION_ERROR = "WS_ORDERS_CONNECTION_ERROR";
export const WS_ORDERS_CONNECTION_CLOSED = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE = "WS_ORDERS_GET_MESSAGE";
export const WS_ORDERS_SEND_MESSAGE = "WS_ORDERS_SEND_MESSAGE";

export const feedWsActions = {
    wsInit: WS_FEED_CONNECTION_START,
    wsSendMessage: WS_FEED_SEND_MESSAGE,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE,
};

export const userOrdersWsActions = {
    wsInit: WS_ORDERS_CONNECTION_START,
    wsSendMessage: WS_ORDERS_SEND_MESSAGE,
    onOpen: WS_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_ORDERS_CONNECTION_CLOSED,
    onError: WS_ORDERS_CONNECTION_ERROR,
    onMessage: WS_ORDERS_GET_MESSAGE,
};