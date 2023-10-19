import React, {FC} from "react";
import style from "./BurgerIngredientsItem.module.css";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../utils/hooks";
import { useDrag } from "react-dnd";

interface IBurgerIngredientItems {
    ingredient: TIngredient,
    onClick: (ingredient: TIngredient) => void
}

const BurgerIngredientsItems: FC<IBurgerIngredientItems> = ({ ingredient, onClick }) => {
    const ingredients = useAppSelector(
        store => store.burger.constructorReducer.ingredients,
    ).filter((item: TIngredient) => {
        return item && item._id === ingredient._id;
    });

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
    });

    return (
        <li
            id={ingredient._id}
            key={ingredient._id}
            className={style.item}
            onClick={() => {
                window?.getSelection()?.toString() === "" && onClick(ingredient);
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
                src={ingredient.image}
                alt={ingredient.name}
                className={style.item__image}
            />
            <div className={style.item__price}>
                <p
                    className={`text text_type_digits-medium pr-1 ${style.item__price__value}`}
                >
                    {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <h2 className={style.item__title}>{ingredient.name}</h2>
        </li>
    );
};

export default BurgerIngredientsItems;
