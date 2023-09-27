import style from "../../components/App/App.module.css";
import BurgerIngredients from "../../components/BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import React, {FC} from "react";
import {TIngredient} from "../../utils/types";

interface IHomePage {
    toggleOrderDetails: () => void,
    showIngredientDetails: (ingredient: TIngredient) => void
}

const HomePage: FC<IHomePage> = ({ toggleOrderDetails, showIngredientDetails }) => {
    return (
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
    );
}

export default HomePage;