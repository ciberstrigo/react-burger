import styles from "./OrderPosition.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useEffect, useMemo, useState} from "react";
import {uniq} from "../../utils/functions";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../utils/hooks";
import IngredientImage from "../IngredientImage/IngredientImage";

interface IOrderPositions {
    ingredients: Array<TIngredient>
}

const OrderPositions : FC<IOrderPositions> = ({ ingredients }) => {
    const data: Array<TIngredient> = useAppSelector((store) => store.burger.ingredientsReducer.ingredients);
    const [renderData, setRenderData] = useState<Array<TIngredient> | Array<undefined> | undefined>();

    const count = (elem : TIngredient | undefined) => {
        return ingredients.filter((item) => {
            return item === elem;
        }).length;
    }

    const orderIngredient = useMemo(() => {
        return ingredients.map((elem) => {
            return data.find((item: TIngredient) => {
                return elem._id === item._id;
            });
        });
    }, [ingredients, data]);

    useEffect(()=> {
        const temp = uniq(orderIngredient)
        setRenderData(temp)
    }, [orderIngredient])

    return(
        <ul className={styles.ingredientList}>
            {renderData && renderData.map((item,index) => {
                return(
                    <li className={styles.wrapper} key={index}>
                        <div className={styles.container}>
                            <IngredientImage image={item?.image} alt={item?.name}/>
                            <p className="text text_type_main-default ml-4">{item?.name}</p>
                        </div>
                        <div className={styles.container}>
                            <p className="text text_type_digits-default pr-2">
                                {item?.type === "bun"
                                    ? `${count(item)} x ${item.price}`
                                    : `${count(item)} x ${item?.price}`}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
};

export default OrderPositions;