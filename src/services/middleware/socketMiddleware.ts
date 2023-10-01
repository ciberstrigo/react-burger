import {getCookie} from "../../utils/cookies";

export const socketMiddleware = (wsUrl: string, wsActions: any, isAuth: boolean ) => {
    return (store: any) => {
        let socket: any = null;

        return (next: any) => (action: any) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const accessToken = getCookie('accessToken')

            if (type === wsInit) {
                if (isAuth) {
                    socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                } else {
                    socket = new WebSocket(wsUrl);
                }
            }
            if (socket) {
                socket.onopen = (event: any) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event: any) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event: any) => {
                    const { data } = event;

                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = (event: any) => {
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