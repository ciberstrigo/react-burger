import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./ProfileMenu.module.css";
import {useDispatch} from "react-redux";
import {loggingOut} from "../../services/actions/user";

export function ProfileMenu() {
    const dispatch = useDispatch();

    const onLoggingOut = () => {
        dispatch(loggingOut());
    };

    return (
        <div className={`${styles.tabs} ml-4 mr-15`}>
            <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-medium`}
                activestyle={{ color: "#FFFFFF" }}
            >
                Профиль
            </NavLink>
            <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-medium`}
                activestyle={{ color: "#FFFFFF" }}
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