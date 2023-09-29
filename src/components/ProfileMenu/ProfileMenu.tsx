import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./ProfileMenu.module.css";
import {loggingOut} from "../../services/actions/user";
import {useAppDispatch} from "../../utils/hooks";

export function ProfileMenu() {
    const dispatch = useAppDispatch();

    const onLoggingOut = () => {
        dispatch(loggingOut());
    };

    return (
        <div className={`${styles.tabs} ml-4 mr-15`}>
            <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-medium`}
            >
                Профиль
            </NavLink>
            <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-medium`}
            >
                История заказов
            </NavLink>
            <button className={`${styles.link} text_type_main-medium`} onClick={onLoggingOut}>
                Выход
            </button>
            <p className={`${styles.description} text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}