import React, {FC} from "react";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AppHeader.module.css";
import {NavLink} from "react-router-dom";

const AppHeader: FC = () => {
    const navLinkClassName = ({ isActive }: {isActive: boolean}) => {
        return `${style.AppHeaders__navLink} 
        ${isActive ? style.AppHeaders__navLink_active : style.AppHeaders__navLink_inactive}`;
    };

    return (
        <header className={`p-4 ${style.AppHeaders}`}>
            <nav className={style.AppHeaders__leftNavigation}>
                <NavLink
                    to={"/"}
                    className={navLinkClassName}
                >
                    <span className={style.AppHeaders__navLink__icon}>
                        <BurgerIcon type="secondary" />
                    </span>
                    Конструктор
                </NavLink>
                <NavLink
                    to={"/constructor"}
                    className={navLinkClassName}
                >
                    <span className={style.AppHeaders__navLink__icon}>
                        <ListIcon type="secondary" />
                    </span>
                    Лента заказов
                </NavLink>
            </nav>

            <div className={style.AppHeaders__Logo}>
                <Logo />
            </div>

            <NavLink
                to={"/profile"}
                className={navLinkClassName}
            >
                <span className={style.AppHeaders__navLink__icon}>
                    <ProfileIcon type="secondary" />
                </span>
                Личный кабинет
            </NavLink>
        </header>
    );
};

export default AppHeader;
