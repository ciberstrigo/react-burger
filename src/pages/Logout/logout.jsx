import React from "react";
import {deleteCookie, setCookie} from "../../utils/cookies";
import {Navigate, useNavigate} from "react-router-dom";
import {loggingOut} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";

const Logout = () => {
    useDispatch()(loggingOut());

    return (
        <Navigate to={{ pathname: '/' }} />
    );
}

export default Logout;