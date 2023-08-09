import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { BurgerConstructorContext } from "../../utils/burgerConstructorContext";

const API_URL = "https://norma.nomoreparties.space/api";

const App = () => {
    const [currentIngredient, setCurrentIngredient] = React.useState(null);
    const [assortment, setAssortment] = React.useState();
    const [orderDetails, setOrderDetails] = React.useState();
    const [burger, setBurger] = React.useState({ bun: null, ingredients: [] });

    const checkReponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    };

    const [price, priceDispatch] = React.useReducer((state, { action }) => {
        if (["add_ingredient", "remove_ingredient"].includes(action)) {
            return [
                burger.bun?.price,
                ...burger.ingredients.map((e) => (e ? e.price : 0)),
                burger.bun?.price,
            ]
                .filter((e) => e > 0)
                .reduce((acc, val) => acc + val, 0);
        }
        throw Error("Unknown action.");
    }, 0);

    const addIngredient = (ingredient) => {
        if (ingredient.type === "bun") {
            setBurger((prevState) => {
                return {
                    ...prevState,
                    bun: ingredient,
                };
            });
        } else {
            setBurger((prevState) => {
                return {
                    ...prevState,
                    ingredients: [...prevState.ingredients, ingredient],
                };
            });
        }

        priceDispatch({ action: "add_ingredient" });
    };

    const removeIngredient = (ingredient) => {
        if (ingredient.type === "bun") {
            setBurger((prevState) => {
                return {
                    ...prevState,
                    bun: null,
                };
            });
        } else {
            setBurger((prevState) => {
                return {
                    ...prevState,
                    ingredients: [
                        ...prevState.ingredients.filter(
                            (_, index) =>
                                index !==
                                prevState.ingredients.findIndex(
                                    (p) => p._id === ingredient._id,
                                ),
                        ),
                    ],
                };
            });
        }
        priceDispatch({ action: "remove_ingredient" });
    };

    React.useEffect(() => {
        fetch(`${API_URL}/ingredients`)
            .then(checkReponse)
            .then(({ data }) => {
                setAssortment(data);

                // рандом заполнение булки и ингредиентов
                const makeRandom = (array = [], len = 5) => {
                    const shuffledArray = [...array];
                    for (let i = shuffledArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledArray[i], shuffledArray[j]] = [
                            shuffledArray[j],
                            shuffledArray[i],
                        ];
                    }

                    return shuffledArray.slice(0, len);
                };

                // А вот тут добавляются ингридиенты по одному
                [
                    ...makeRandom(
                        data.filter((e) => e.type === "bun"),
                        1,
                    ),
                    ...makeRandom(
                        data.filter((e) => e.type !== "bun"),
                        2,
                    ),
                ].map((e) => addIngredient(e));
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    }, []);

    const makeOrder = () => {
        fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: [
                    burger.bun,
                    ...burger.ingredients,
                    burger.bun,
                ].map((e) => e._id),
            }),
        })
            .then(checkReponse)
            .then((data) => {
                setOrderDetails(data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    };

    const closeIngredientDetails = () => {
        setCurrentIngredient(null);
    };

    const showIngredientDetails = (ingredient) => {
        setCurrentIngredient(ingredient ?? null);
    };

    const closeOrderModal = () => {
        setOrderDetails(null);
    };

    return (
        <div className={style.App__main}>
            <AppHeader />
            <main className={style.App__content}>
                <div className={style.App__container}>
                    <BurgerIngredients
                        assortment={assortment}
                        showDetails={showIngredientDetails}
                    />
                    <BurgerConstructorContext.Provider
                        value={{
                            burger: burger,
                            price: price,
                            makeOrder: makeOrder,
                            removeIngredient: removeIngredient,
                        }}
                    >
                        <BurgerConstructor />
                    </BurgerConstructorContext.Provider>
                </div>
            </main>
            {orderDetails && (
                <Modal onClose={closeOrderModal}>
                    <OrderDetails details={orderDetails} />
                </Modal>
            )}
            {currentIngredient && (
                <Modal
                    header={"Детали ингредиента"}
                    onClose={closeIngredientDetails}
                >
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            )}
        </div>
    );
};

export default App;
