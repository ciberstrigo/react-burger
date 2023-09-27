import React, {FC, ReactElement} from "react";
import {Navigate, useLocation} from 'react-router-dom';
import {RootState} from "../../utils/store";
import {useAppSelector} from "../../utils/hooks";

interface IProtectedRoute {
    children: ReactElement;
    onlyAuth: boolean;
}

const ProtectedRoute: FC<IProtectedRoute>  = ({children, onlyAuth = true}) => {
    const isAuth = useAppSelector((store: RootState) => store.user.isAuth);
    const { state } = useLocation();

    if (onlyAuth && !isAuth) {
        return <Navigate to={"/login"} replace/>
    }

    if (!onlyAuth && isAuth) {
        return <Navigate to={state?.from || "/"} replace/>
    }

    return children;
}

export default ProtectedRoute;