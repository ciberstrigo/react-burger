import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import icon from "../../images/icon.svg";
import style from "./OrderDetails.module.css"

const OrderDetails = () => {
    return (
        <div className={style.OrderDetails__content}>
            <p className={`text text_type_digits-large ${style.OrderDetails__number}`}>034536</p>
            <h2 className={"pt-8 text text_type_main-medium"}>идентификатор заказа</h2>
            <img className={"pt-15 pb-15"} src={icon} alt="done"/>
            <p className="text text_type_main-small pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;