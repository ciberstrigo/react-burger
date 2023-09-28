import React, {FC, ReactElement} from "react";
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../utils/hooks";

interface IProtectedRoute {
    children: ReactElement;
    anonymous: boolean;
}

const ProtectedRoute: FC<IProtectedRoute>  = ({ children, anonymous = false }) => {
    const isLoggedIn = useAppSelector(store => store.user.isLoggedIn);

    const location = useLocation();
    const from = location.state?.from || '/';
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLoggedIn) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
}

export default ProtectedRoute;