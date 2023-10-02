import {getCookie} from "../../utils/cookies";
import {Middleware, MiddlewareAPI} from "redux";
import {TwsActions} from "../../utils/types";

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions, isAuth: boolean): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null  = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const accessToken = getCookie('accessToken').replace('Bearer ', '');

            if (type === wsInit) {
                if (isAuth) {
                    socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                } else {
                    socket = new WebSocket(wsUrl);
                }
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    // Ну тут никак вообще, эта переменная не используется.
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const data = { ...payload };
                    socket.send(JSON.stringify(data));
                }
            }

            next(action);
        };
    };
};