import React, {FC, MutableRefObject, useMemo} from "react";
import style from "./BurgerConstructor.module.css";
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import {TIngredient} from "../../utils/types";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import {useAppSelector} from "../../utils/hooks";

import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { applyOrder } from "../../services/actions/applyOrder";
import { useDrop } from "react-dnd";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../utils/hooks";
import { v4 as uuidv4 } from 'uuid';

interface IBurgerConstructor {
    showOrderDetails: () => void
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ showOrderDetails }) => {
    const scrollableRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const data = useAppSelector(store => store.burger.constructorReducer.ingredients);
    const isAuth = useAppSelector(store => store.user.isAuth);
    const navigate = useNavigate();

    const { burgerBun, ingredients } = useMemo(() => {
        return {
            burgerBun: data.find((item: TIngredient) => item.type === "bun"),
            ingredients: data.filter((item: TIngredient) => item.type !== "bun"),
        };
    }, [data]);

    const total = useAppSelector(
        store => store.burger.constructorReducer.ingredients,
    ).reduce((acc: number, { price }: TIngredient) => {
        return acc + parseInt(String(price));
    }, 0);

    const adjustContainerHeight = () => {
        const height = window.innerHeight - (window.innerHeight % 90);
        scrollableRef.current.style.maxHeight = `calc(${height}px - 640px)`;
    };

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        adjustContainerHeight();

        window.addEventListener("resize", adjustContainerHeight);
        return () => {
            window.removeEventListener("resize", adjustContainerHeight);
        };
    });

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TIngredient) {
            if (item.type === "bun") {
                for (let i = 0; i < 2; i++) {
                    if (burgerBun) {
                        const id = burgerBun._id;
                        dispatch({
                            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
                            id: id,
                        });
                    }
                    dispatch({
                        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                        draggedIngredient: {...item, uniqueId: uuidv4()},
                    });
                }
            } else {
                dispatch({
                    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                    draggedIngredient: {...item, uniqueId: uuidv4()},
                });
            }
        },
    });

    const makeOrder = () => {
        if (!isAuth) {
            return navigate('/login');
        }
        if (burgerBun) {
            dispatch(
                applyOrder([
                    burgerBun._id,
                    ...ingredients.map((item: TIngredient) => item._id),
                    burgerBun._id,
                ]),
            );
            showOrderDetails();
        }
    }

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
                        isLocked
                    />
                )}
                <div className={`${style.scrollable}`} ref={scrollableRef}>
                    {ingredients &&
                        ingredients.map(
                            (e: TIngredient, index: number) =>
                                e.type !== "bun" && (
                                    <BurgerConstructorItem
                                        item={e}
                                        key={e.uniqueId}
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
                        isLocked
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
                        onClick={makeOrder}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BurgerConstructor;
