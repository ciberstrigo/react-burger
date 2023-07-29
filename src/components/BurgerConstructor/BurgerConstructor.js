import React from "react";
import PropTypes from 'prop-types';
import style from "./BurgerConstructor.module.css"
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import types from "../../utils/types";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";

class BurgerIngredients extends React.Component {
    render() {
        return (<section className={style.burgerConstructor}>
            <div className={style.burgerConstructor__list}>
                {
                    !!this.props.burgerBun && (
                        <ConstructorElement
                            type="top"
                            text={`${this.props.burgerBun.name} (верх)`}
                            price={this.props.burgerBun.price}
                            thumbnail={this.props.burgerBun.image}
                            extraClass={'mr-4'}
                        />
                    )
                }
                <div className={`${style.scrollable}`}>
                {
                    this.props.ingredients.map((e) => {
                        return (
                            <BurgerConstructorItem item={e} key={e._id}/>
                        );
                    })
                }
                </div>
                {
                    !!this.props.burgerBun && (
                        <ConstructorElement
                            type="bottom"
                            text={`${this.props.burgerBun.name} (низ)`}
                            price={this.props.burgerBun.price}
                            thumbnail={this.props.burgerBun.image}
                            extraClass={'mr-4'}
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
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>);
    }
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(types.ingredient),
    burgerBun: types.ingredient
};

export default BurgerIngredients;