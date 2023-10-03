import React, {FC} from "react";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import icon from "../../images/icon.svg";
import style from "./OrderDetails.module.css";
import {useAppSelector} from "../../utils/hooks";

const OrderDetails: FC = () => {
    const orderNumber = useAppSelector(store => store.order.order.orderNumber);

    return (
        orderNumber ?
            (<div className={style.OrderDetails__content}>
                <p
                    className={`text text_type_digits-large ${style.OrderDetails__number}`}
                >
                    {orderNumber}
                </p>
                <h2 className={"pt-8 text text_type_main-medium"}>
                    идентификатор заказа
                </h2>
                <img className={"pt-15 pb-15"} src={icon} alt="done" />
                <p className="text text_type_main-small pb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>) : (
                <div className={style.OrderDetails__content}>
                    {/*<p className={`text text_type_digits-large ${style.OrderDetails__number}`}>Loading...</p>*/}
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
    );
};

export default OrderDetails;
