import style from "../../components/App/App.module.css";
import BurgerIngredients from "../../components/BurgerIngridients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ toggleOrderDetails, showIngredientDetails }) => {
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

HomePage.propTypes = {
    toggleOrderDetails: PropTypes.func.isRequired,
    showIngredientDetails: PropTypes.func.isRequired,
};

export default HomePage;