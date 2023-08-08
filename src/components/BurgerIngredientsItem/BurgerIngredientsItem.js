import React from "react";
import style from "./BurgerIngredientsItem.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import types from "../../utils/types";

const BurgerIngredientsItems = ({ data, count, onClick }) => {
    return (
        <li
            key={data._id}
            className={style.item}
            onClick={() => {
                window.getSelection().toString() === "" && onClick(data);
            }}
        >
            {count > 0 && (
                <Counter count={count} size="default" extraClass="m-1" />
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
