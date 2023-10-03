import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/webSocketActionTypes";
import {Link, useLocation} from "react-router-dom";
import styles from "./ProfileOrders.module.css";
import OrderCard from "../Orders/components/OrderCard/orderCard";
import {TOrder} from "../../utils/types";

const ProfileOrders: FC = () => {
    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: WS_ORDERS_CONNECTION_START });

        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
        };
    }, [dispatch]);

    const orders = useAppSelector(store => store.userOrders.orders);

    if (!orders) {
        return <p>Loading</p>;
    }

    if (orders.length === 0) {
        return <p>Нет заказов</p>;
    }

    return (
        <div className={`${styles.wrapper} scrollable`}>
            {orders
                ? orders.reverse().map((order: TOrder, index: number) => {
                    return(
                        <Link
                            key={index}
                            className={`${styles.link}`}
                            to={{
                                pathname: `${location.pathname}/${order.number}`
                            }}
                            state={{background : location }}
                        >
                            <OrderCard viewStatus={true} key={index} order={order} />
                        </Link>
                    )
                })
                : null}
        </div>
    );
};

export default ProfileOrders;