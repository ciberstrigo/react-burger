import React from "react";
import {Navigate} from "react-router-dom";
import {loggingOut} from "../../services/actions/user";
import {useDispatch} from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    dispatch(loggingOut());

    return (
        <Navigate to={{ pathname: '/' }} />
    );
}

export default Logout;