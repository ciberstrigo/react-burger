import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

export default function ProtectedRouteElement({children}) {
    const { isAuth } = useSelector(store => store.user);

    if (!isAuth) {
        return <Navigate to={"/login"} replace/>
    }

    return children;
}

ProtectedRouteElement.propTypes = {
    children: PropTypes.node.isRequired
};