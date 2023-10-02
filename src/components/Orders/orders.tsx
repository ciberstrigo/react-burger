import styles from "./orders.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import OrderCard from "./components/OrderCard/orderCard";
import {useAppSelector} from "../../utils/hooks";
import React, {FC} from "react";
import {TOrder} from "../../utils/types";

const Orders: FC = () => {
    const { orders } = useAppSelector(store => store.feed);
    const location = useLocation();
    const navigate = useNavigate();

    const locateToOrderItem = (order: TOrder) => {
        navigate(`/feed/${order.number}`, {
            state: { background: location },
        });
    };

    return (
        <section>
            <h2 className={`${styles.title}`}>
                Лента заказов
            </h2>
            <ul className={`${styles.ordersList} scrollable`}>
                {orders &&
                    orders.map((item: TOrder, index: number) => {
                        return(
                            <div
                                key={uuidv4()}
                                className={styles.link}
                                onClick={() => {locateToOrderItem(item)}}
                            >
                                <OrderCard order={item} key={index} />
                            </div>
                        )
                    })}
            </ul>
        </section>
    );
};

export default Orders;