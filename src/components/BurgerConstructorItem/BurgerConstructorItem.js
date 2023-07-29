import React from "react";
import style from "./BurgerConstructorItem.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import types from "../../utils/types";

class BurgerConstructorItem extends React.Component {
    render() {
        return (
            <div
                className={`${style.item}`}
                draggable
            >
                <DragIcon type="primary" />
                <ConstructorElement
                    isLocked={false}
                    text={this.props.item.name}
                    price={this.props.item.price}
                    thumbnail={this.props.item.image}
                />
            </div>
        );
    }
}

BurgerConstructorItem.propTypes = {
    item: types.ingredient
};

export default BurgerConstructorItem;
