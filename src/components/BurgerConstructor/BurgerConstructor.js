import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructorStyle from "./BurgerConstructor.module.css"
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

class BurgerIngredients extends React.Component {
    render() {
        return <section className={BurgerConstructorStyle.burgerConstructor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}
                 className={'pt-25 pl-4 pr-4 pb-10'}>
                {
                    !!this.props.burgerBun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={this.props.burgerBun.name}
                            price={this.props.burgerBun.price}
                            thumbnail={this.props.burgerBun.image}
                        />
                    )
                }
                {
                    this.props.ingredients.map((e) => {
                        return <ConstructorElement
                            key={e._id}
                            isLocked={true}
                            text={e.name}
                            price={e.price}
                            thumbnail={e.image}
                        />
                    })
                }
                {
                    !!this.props.burgerBun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={this.props.burgerBun.name}
                            price={this.props.burgerBun.price}
                            thumbnail={this.props.burgerBun.image}
                            />
                    )
                }
                <div className={BurgerConstructorStyle.makeOrderBlock}>
                    <div className={BurgerConstructorStyle.priceBlock}>
                    <span className={BurgerConstructorStyle.priceBlock__number}>
                        610
                    </span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    }
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string
        })
    ),
    burgerBun: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default BurgerIngredients;