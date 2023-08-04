import React from "react";
import PropTypes from 'prop-types';
import style from "./BurgerConstructor.module.css"
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import types from "../../utils/types";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";

const BurgerIngredients = ({burgerBun, ingredients, showOrderDetails}) => {
    return (<section className={style.burgerConstructor}>
        <div className={style.burgerConstructor__list}>
            {
                !!burgerBun && (
                    <ConstructorElement
                        type="top"
                        text={`${burgerBun.name} (верх)`}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}
                        extraClass={'mr-4'}
                        isLocked={true}
                    />
                )
            }
            <div className={`${style.scrollable}`}>
            {
                ingredients &&
                ingredients.map((e) =>
                    e.type !== 'bun' && (
                        <BurgerConstructorItem item={e} key={e._id}/>
                    )
                )
            }
            </div>
            {
                !!burgerBun && (
                    <ConstructorElement
                        type="bottom"
                        text={`${burgerBun.name} (низ)`}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}
                        extraClass={'mr-4'}
                        isLocked={true}
                        />
                )
            }
            <div className={style.makeOrderBlock}>
                <div className={style.priceBlock}>
                <span className={style.priceBlock__number}>
                    610
                </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={showOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    </section>);
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(types.ingredient),
    burgerBun: types.ingredient,
    showOrderDetails: PropTypes.func
};

export default BurgerIngredients;
