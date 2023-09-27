import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
const element = <Provider store={store}>
    <Router>
        <App />
    </Router>
</Provider>;
root.render(element);
