import React from "react";
import style from "./BurgerIngredientsItem.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import types from "../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const BurgerIngredientsItems = ({ data, onClick }) => {
    const ingredients = useSelector(//x
        (store) => store.burger.constructorReducer.ingredients,
    ).filter((item) => {
        return item && item._id === data._id;
    });

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: data,
    });

    return (
        <li
            key={data._id}
            className={style.item}
            onClick={() => {
                window.getSelection().toString() === "" && onClick(data);
            }}
            ref={dragRef}
        >
            {ingredients.length > 0 && (
                <Counter
                    count={ingredients.length}
                    size="default"
                    extraClass="m-1"
                />
            )}
            <img
                src={data.image}
                alt={data.name}
                className={style.item__image}
            />
            <div className={style.item__price}>
                <p
                    className={`text text_type_digits-medium pr-1 ${style.item__price__value}`}
                >
                    {data.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <h2 className={style.item__title}>{data.name}</h2>
        </li>
    );
};

BurgerIngredientsItems.propTypes = {
    data: types.ingredient,
    count: PropTypes.number,
    onClick: PropTypes.func,
};

export default BurgerIngredientsItems;
