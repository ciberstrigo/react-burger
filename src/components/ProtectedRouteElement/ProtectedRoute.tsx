import React, {FC, ReactElement} from "react";
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../utils/hooks";

interface IProtectedRoute {
    children: ReactElement;
    onlyAuth: boolean;
}

const ProtectedRoute: FC<IProtectedRoute>  = ({children, onlyAuth = true}) => {
    const isAuth = useAppSelector(store => store.user.isAuth);
    const { state } = useLocation();

    if (onlyAuth && !isAuth) {
        return <Navigate to={"/login"} state={{ from: location}}/>
    }

    if (!onlyAuth && isAuth) {
        return <Navigate to={state?.from || "/"} replace/>
    }

    return children;
}

export default ProtectedRoute;