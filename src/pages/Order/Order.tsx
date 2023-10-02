import React, {useMemo} from "react";
import {FC} from "react";
import {useLocation, useParams} from 'react-router-dom'
import styles from "./order.module.css";
import {useAppSelector} from "../../utils/hooks";
import {TIngredient, TOrder} from "../../utils/types";
import {formatDate, uniq} from "../../utils/functions";
import OrderPosition from "../../components/OrderPosition/OrderPosition";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Order: FC = () => {
    console.log('its an order');
    const { pathname } = useLocation();
    const orders =
        pathname.includes('/profile/orders') ?
            useAppSelector(store => store.userOrders.orders) :
            useAppSelector(store => store.feed.orders);


    console.log(pathname);
    console.log(orders);

    const data: Array<TIngredient> = useAppSelector(store => store.burger.ingredientsReducer.ingredients);
    const { id } = useParams();

    const order = useMemo(
        () => orders.filter((order: TOrder) => order._id === id)[0],[orders, id]
    );

    const orderIngredientsData = useMemo(() => {
        return order ? order.ingredients.map((id: string) => {
            return data.find((item: TIngredient) => {
                return id === item._id;
            });
    }) : []}, [order, data]);

    const orderTotalPrice = useMemo(() => {
        const temp = uniq(orderIngredientsData)
        return temp?.reduce((sum : number, item : TIngredient | undefined) => {
            if (item?.type === "bun") {
                return (sum += item.price * 2);
            }
            return (sum += item ? item.price : 0);
        }, 0)
    }, [orderIngredientsData]);

    return (
        <>
            { order &&
                <div className={styles.wrapper}>
                    <p className={`text text_type_digits-default ${styles.number}`}>#{order ? order.number : null}</p>
                    <p className="text text_type_main-medium mt-10">{order ? order.name : null}</p>
                    <p className={`text text_type_main-small mt-3 ${styles.status}`}>
                        {order.status === "done"
                            ? "Выполнен"
                            : order.status === "pending"
                                ? "Готовится"
                                : order.status === "created"
                                    ? "Создан"
                                    : "Выполнен"}
                    </p>
                    <p className="text text_type_main-medium mt-15">Состав:</p>
                    <div className={`${styles.ingredientsContainer} scrollable mt-6 mb-10 pr-6`}>
                        <OrderPosition ingredients={orderIngredientsData}/>
                    </div>
                    <div className={styles.footer}>
                        <p className="text text_type_main-default text_color_inactive">
                            {order ? formatDate(order.createdAt) : null}
                        </p>
                        <div className={styles.totalPrice}>
                            <p className="text text_type_digits-default">{orderTotalPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Order;