import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeadersStyles from "./AppHeader.module.css";

class AppHeader extends React.Component {
    render() {
        return <header className={`p-4 ${AppHeadersStyles.AppHeaders}`}>
            <nav className={AppHeadersStyles.AppHeaders__leftNavigation}>
                <a href={"/constructor"} className={`${AppHeadersStyles.AppHeaders__navLink} ${AppHeadersStyles.AppHeaders__navLink_active}`}>
                    <span className={AppHeadersStyles.AppHeaders__navLink__icon}>
                        <BurgerIcon type="primary"/>
                    </span>
                    Конструктор
                </a>
                <a href={"/constructor"} className={`${AppHeadersStyles.AppHeaders__navLink} ${AppHeadersStyles.AppHeaders__navLink_inactive}`}>
                    <span className={AppHeadersStyles.AppHeaders__navLink__icon}>
                        <ListIcon type="secondary" />
                    </span>
                    Лента заказов
                </a>
            </nav>

            <div className={AppHeadersStyles.AppHeaders__Logo}>
                <Logo />
            </div>

            <a href={"/lk"} className={`${AppHeadersStyles.AppHeaders__navLink} ${AppHeadersStyles.AppHeaders__navLink_inactive}`} >
                <span className={AppHeadersStyles.AppHeaders__navLink__icon}>
                    <ProfileIcon type="secondary" />
                </span>
                Личный кабинет
            </a>
        </header>;
    }
}

export default AppHeader;