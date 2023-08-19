import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./BurgerConstructor.module.css";
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import types from "../../utils/types";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import { BurgerConstructorContext } from "../../utils/contexts";
import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber} from "../../services/actions";

const BurgerConstructor = ({ showOrderDetails }) => {
    const { burger, makeOrder, price } = useContext(BurgerConstructorContext);
    const scrollableRef = React.useRef();
    const ingredients = useSelector(store => store.burger.constructorIngredients);
    const burgerBun = useSelector(store => store.burger.constructorIngredients)
        .filter(item => item.type === 'bun');

    const adjustContainerHeight = () => {
        const height = window.innerHeight - (window.innerHeight % 90);
        scrollableRef.current.style.maxHeight = `calc(${height}px - 640px)`;
    };

    const dispatch = useDispatch();

    React.useEffect(() => {
        adjustContainerHeight();

        window.addEventListener("resize", adjustContainerHeight);
        return () => {
            window.removeEventListener("resize", adjustContainerHeight);
        };
    });

    return (
        <section className={style.burgerConstructor}>
            <div className={style.burgerConstructor__list}>
                {!!burger.bun && (
                    <ConstructorElement
                        type="top"
                        text={`${burger.bun.name} (верх)`}
                        price={burger.bun.price}
                        thumbnail={burger.bun.image}
                        extraClass={"mr-4"}
                        isLocked={true}
                    />
                )}
                <div className={`${style.scrollable}`} ref={scrollableRef}>
                    {burger.ingredients &&
                        burger.ingredients.map(
                            (e) =>
                                e.type !== "bun" && (
                                    <BurgerConstructorItem
                                        item={e}
                                        key={e._id}
                                    />
                                ),
                        )}
                </div>
                {!!burger.bun && (
                    <ConstructorElement
                        type="bottom"
                        text={`${burger.bun.name} (низ)`}
                        price={burger.bun.price}
                        thumbnail={burger.bun.image}
                        extraClass={"mr-4"}
                        isLocked={true}
                    />
                )}
                <div className={style.makeOrderBlock}>
                    <div className={style.priceBlock}>
                        <span className={style.priceBlock__number}>
                            {price}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => {
                            if(burgerBun && ingredients.length > 2) {
                                dispatch(getOrderNumber(ingredients));
                                showOrderDetails();
                            }
                        }}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(types.ingredient),
    burger: types.burger,
    showOrderDetails: PropTypes.func,
};

export default BurgerConstructor;
