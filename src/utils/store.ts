import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "../services/reducers/rootReducer";
import thunk from "redux-thunk";

// Интеграция react-devtools
const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

// Так-же подключается react-thunk
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;