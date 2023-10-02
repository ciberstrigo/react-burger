import styles from "./orderCard.module.css";
import { useMemo, FC } from "react";
import {TIngredient, TOrder} from "../../../../utils/types";
import {useAppSelector} from "../../../../utils/hooks";
import IngredientImage from "../IngredientImage/IngredientImage";
import {formatDate} from "../../../../utils/functions";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    order : TOrder,
    viewStatus?: boolean
}

const OrderCard : FC<IProps> = ({ order, viewStatus }) => {
    const ingredients = useAppSelector(store => store.burger.ingredientsReducer.ingredients);
    const maxIngredients = 6;
    const arrIngredientsLength = order.ingredients.length;
    const hideIngredients = arrIngredientsLength - 6;

    const orderIngredientsData = useMemo(() => {
        return order.ingredients.map((id) => {
            return ingredients.find((item: TIngredient) => {
                return id === item._id;
            });
        });
    }, [order.ingredients, ingredients]);

    const orderTotalPrice = useMemo(() => {
        return orderIngredientsData.reduce((sum, item) => {
            if (item?.type === "bun") {
                sum += item.price * 2
                return sum;
            }
            sum += item ? item.price : 0;
            return sum;
        }, 0);
    }, [orderIngredientsData]);


    return (
        <li className={`${styles.wrapper}`}>
            <div className={styles.orderId}>
                <p className="text text_type_digits-default">
                    #{order ? order.number : null}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {order ? formatDate(order.createdAt) : null}
                </p>
            </div>
            <p className={`mt-6 text text_type_main-medium ${styles.name}`}>
                {order ? order.name : null}
            </p>
            {viewStatus && (
                <p className="text text_type_main-default">
                    {order.status === "done"
                        ? "Выполнен"
                        : order.status === "pending"
                            ? "Готовится"
                            : order.status === "created"
                                ? "Создан"
                                : "Выполнен"}
                </p>
            )}
            <div className={styles.orderInfo}>
                <ul className={`${styles.ingredients} mt-6`}>
                    {arrIngredientsLength <= 5 &&
                        orderIngredientsData.map((item, index) => {
                            const zIndex = maxIngredients - index;
                            return (
                                <li
                                    className={styles.orderImage}
                                    style={{ zIndex: zIndex }}
                                    key={index}
                                >
                                    <IngredientImage image={item?.image} alt={item?.name} />
                                </li>
                            );
                        })}
                    {orderIngredientsData &&
                        arrIngredientsLength >= 6 &&
                        orderIngredientsData.slice(0, 5).map((item, index) => {
                            const zIndex = maxIngredients - index;
                            return (
                                <li
                                    className={styles.orderImage}
                                    style={{ zIndex: zIndex }}
                                    key={index}
                                >
                                    {item && (
                                        <IngredientImage image={item.image} alt={item.name} />
                                    )}
                                </li>
                            );
                        })}
                    {orderIngredientsData &&
                        arrIngredientsLength > 6 &&
                        orderIngredientsData.slice(5, 6).map((item, index) => {
                            const zIndex = -index;
                            return (
                                <li
                                    className={styles.orderImage}
                                    style={{ zIndex: zIndex }}
                                    key={index}
                                >
                                    {item && (
                                        <>
                                            <div className={styles.hidePic}>
                                                <IngredientImage
                                                    image={item.image}
                                                    alt={item.name}
                                                    hide="true"
                                                />
                                                <p
                                                    className={`text text_type_main-default ${styles.hideText}`}
                                                >
                                                    {`+${hideIngredients}`}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                </ul>
                <div className={styles.totalPrice}>
                    <span className="text text_type_digits-default">
                        {orderTotalPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    );
};


export default OrderCard;