import React from "react";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";

const AppHeader = () => {
    return (
        <header className={`p-4 ${style.AppHeaders}`}>
            <nav className={style.AppHeaders__leftNavigation}>
                <a
                    href={"/constructor"}
                    className={`${style.AppHeaders__navLink} ${style.AppHeaders__navLink_active}`}
                >
                    <span className={style.AppHeaders__navLink__icon}>
                        <BurgerIcon type="primary" />
                    </span>
                    Конструктор
                </a>
                <a
                    href={"/constructor"}
                    className={`${style.AppHeaders__navLink} ${style.AppHeaders__navLink_inactive}`}
                >
                    <span className={style.AppHeaders__navLink__icon}>
                        <ListIcon type="secondary" />
                    </span>
                    Лента заказов
                </a>
            </nav>

            <div className={style.AppHeaders__Logo}>
                <Logo />
            </div>

            <a
                href={"/lk"}
                className={`${style.AppHeaders__navLink} ${style.AppHeaders__navLink_inactive}`}
            >
                <span className={style.AppHeaders__navLink__icon}>
                    <ProfileIcon type="secondary" />
                </span>
                Личный кабинет
            </a>
        </header>
    );
};

export default AppHeader;
