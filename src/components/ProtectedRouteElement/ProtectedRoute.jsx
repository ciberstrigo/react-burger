import React from "react";
import {Navigate, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

export default function ProtectedRoute({children, onlyAuth = true}) {
    const isAuth = useSelector(store => store.user.isAuth);
    const { state } = useLocation();

    if (onlyAuth && !isAuth) {
        return <Navigate to={"/login"} replace/>
    }

    if (!onlyAuth && isAuth) {
        return <Navigate to={state?.from || "/"} replace/>
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    onlyAuth: PropTypes.bool
};