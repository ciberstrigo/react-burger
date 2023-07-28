import React from "react";
import style from "./BurgerIngredientsItem.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

class BurgerIngredientsItems extends React.Component {
    render() {
        const data = this.props.data;
        const count = this.props.count;

        return (<li key={data._id} className={style.item}>
            {count > 0 && (
                <Counter count={count} size="default" extraClass="m-1" />
            )}
            <img src={data.image} alt={data.name} className={style.item__image}/>
            <div className={style.item__price}>
                <p className={`text text_type_digits-medium pr-1 ${style.item__price__value}`}>
                    {data.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <h2 className={style.item__title}>
                {data.name}
            </h2>
        </li>);
    }
}

BurgerIngredientsItems.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    }),
    count: PropTypes.number
};

export default BurgerIngredientsItems;