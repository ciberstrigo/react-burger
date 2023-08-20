import React, { useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    getOrderNumber,
} from "../../services/actions";
import { useDrop } from "react-dnd";

const BurgerConstructor = ({ showOrderDetails }) => {
    const scrollableRef = React.useRef();
    const data = useSelector((store) => store.burger.constructorIngredients);

    const { burgerBun, ingredients } = useMemo(() => {
        return {
            burgerBun: data.find((item) => item.type === "bun"),
            ingredients: data.filter((item) => item.type !== "bun"),
        };
    }, [data]);

    let total = useSelector(
        (store) => store.burger.constructorIngredients,
    ).reduce((acc, { price }) => {
        return acc + parseInt(price);
    }, 0);

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

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            if (item.type === "bun") {
                for (let i = 0; i < 2; i++) {
                    if (burgerBun) {
                        let id = burgerBun._id;
                        dispatch({
                            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
                            id: id,
                        });
                    }
                    dispatch({
                        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                        draggedIngredient: item,
                    });
                }
            } else {
                dispatch({
                    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                    draggedIngredient: item,
                });
            }
        },
    });

    return (
        <section className={style.burgerConstructor}>
            <div className={style.burgerConstructor__list} ref={dropTarget}>
                {!burgerBun && !ingredients.length && (
                    <div
                        className={`text text_type_main-default ${style.dropDownField}`}
                    >
                        <p>Перетащите ингредиенты сюда, чтобы начать</p>
                    </div>
                )}
                {burgerBun && (
                    <ConstructorElement
                        type="top"
                        text={`${burgerBun.name} (верх)`}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}
                        extraClass={"mr-4"}
                        isLocked={true}
                    />
                )}
                <div className={`${style.scrollable}`} ref={scrollableRef}>
                    {ingredients &&
                        ingredients.map(
                            (e, index) =>
                                e.type !== "bun" && (
                                    <BurgerConstructorItem
                                        item={e}
                                        key={index}
                                        index={index}
                                    />
                                ),
                        )}
                </div>
                {burgerBun && (
                    <ConstructorElement
                        type="bottom"
                        text={`${burgerBun.name} (низ)`}
                        price={burgerBun.price}
                        thumbnail={burgerBun.image}
                        extraClass={"mr-4"}
                        isLocked={true}
                    />
                )}
                <div className={style.makeOrderBlock}>
                    <div className={style.priceBlock}>
                        <span className={style.priceBlock__number}>
                            {total}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => {
                            if (burgerBun && ingredients.length > 2) {
                                dispatch(
                                    getOrderNumber([
                                        burgerBun._id,
                                        ...ingredients.map((item) => item._id),
                                        burgerBun._id,
                                    ]),
                                );
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
