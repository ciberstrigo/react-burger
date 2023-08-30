import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import {rootReducer} from "./services/reducers/rootReducer";
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

// Интеграция react-devtools
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

// Так-же подключается react-thunk
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Provider store={store}><App /></Provider>;
root.render(element);
