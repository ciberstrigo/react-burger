import React, {useMemo} from "react";
import {FC} from "react";
import {useParams} from 'react-router-dom'
import styles from "./order.module.css";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {TIngredient} from "../../utils/types";
import {countTotalPrice, getOrderStatusAsString, uniq} from "../../utils/functions";
import OrderPosition from "../../components/OrderPosition/OrderPosition";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrderDetails} from "../../services/actions/orderDetails";

const Order: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    React.useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch]);

    const ingredients: Array<TIngredient> = useAppSelector(store => store.burger.ingredientsReducer.ingredients);
    const order = useAppSelector(store => store.orderDetail.order);

    const orderIngredientsData = useMemo(() => {
        return order ? order.ingredients.map((id: string) => {
            return ingredients.find((item: TIngredient) => {
                return id === item._id;
            });
    }) : []}, [order, ingredients]);

    const orderTotalPrice = useMemo(() => {
        const temp = uniq(orderIngredientsData)
        return countTotalPrice(temp)
    }, [orderIngredientsData]);

    const orderStatus = useMemo(() => {
        return getOrderStatusAsString(order);
    }, [order]);

    return (
        <>
            { order &&
                <div className={styles.wrapper}>
                    <p className={`text text_type_digits-default ${styles.number}`}>#{order ? order.number : null}</p>
                    <p className="text text_type_main-medium mt-10">{order ? order.name : null}</p>
                    <p className={`text text_type_main-small mt-3 ${styles.status}`}>
                        {orderStatus}
                    </p>
                    <p className="text text_type_main-medium mt-15">Состав:</p>
                    <div className={`${styles.ingredientsContainer} scrollable mt-6 mb-10 pr-6`}>
                        <OrderPosition ingredients={orderIngredientsData}/>
                    </div>
                    <div className={styles.footer}>
                        <p className="text text_type_main-default text_color_inactive">
                            {order ? (<FormattedDate date={new Date(order.createdAt)} />) : null}
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