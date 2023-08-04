import React from "react";
import style from "./BurgerConstructorItem.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import types from "../../utils/types";

const BurgerConstructorItem = ({item}) => {
    return (
        <div
            className={`${style.item}`}
            draggable
        >
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );
}

BurgerConstructorItem.propTypes = {
    item: types.ingredient
};

export default BurgerConstructorItem;
