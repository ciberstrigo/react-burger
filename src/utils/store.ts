import {applyMiddleware, compose, createStore, Dispatch} from "redux";
import {rootReducer} from "../services/reducers/rootReducer";
import thunk from "redux-thunk";
import {TActionsTypes} from "./types";
import {socketMiddleware} from "../services/middleware/socketMiddleware";
import {feedWsActions, userOrdersWsActions} from "../services/actions/webSocketActionTypes";

// Интеграция react-devtools
const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

// Так-же подключается react-thunk
const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedWsActions, false),
        socketMiddleware('wss://norma.nomoreparties.space/orders', userOrdersWsActions, true)
    )
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<TActionsTypes>//typeof store.dispatch;