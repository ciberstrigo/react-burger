import React from "react";
import AppHeader from "../AppHeaders/AppHeader";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from "./App.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getIngredients, SET_CURRENT_INGREDIENT } from "../../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
    const [orderVisible, setOrderVisible] = React.useState(false);
    const currentIngredient = useSelector(//x
        (store) => store.burger.modalReducer.currentIngredient,
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const toggleOrderDetails = () => {
        setOrderVisible(!orderVisible);
    };

    const showIngredientDetails = (ingredient) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            currentIngredient: ingredient ?? null,
        });
    };

    return (
        <div className={style.App__main}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={style.App__content}>
                    <div className={style.App__container}>
                        <BurgerIngredients
                            showDetails={showIngredientDetails}
                        />
                        <BurgerConstructor
                            showOrderDetails={toggleOrderDetails}
                        />
                    </div>
                </main>
            </DndProvider>
            {orderVisible && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {currentIngredient && (
                <Modal
                    header={"Детали ингредиента"}
                    onClose={() => {
                        showIngredientDetails(null);
                    }}
                >
                    <IngredientDetails ingredient={currentIngredient} />
                </Modal>
            )}
        </div>
    );
};

export default App;
