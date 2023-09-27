import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import {loggingOut} from "../../services/actions/user";
import {useAppDispatch} from "../../utils/hooks";


const Logout: FC = () => {
    const dispatch = useAppDispatch();

    dispatch(loggingOut());

    return (
        <Navigate to={{ pathname: '/' }} />
    );
}

export default Logout;