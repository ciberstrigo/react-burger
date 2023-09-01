import React from "react";
import style from "./IngredientDetails.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const IngredientDetails = () => {
    const { ingredientId } = useParams();
    const ingredients = useSelector(store => {
        return store.burger.ingredientsReducer.ingredients;
    });
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredientId);
    const nutrients = [
        {
            id: "calories",
            name: "Калории, ккал",
        },
        {
            id: "proteins",
            name: "Белки, г",
        },
        {
            id: "fat",
            name: "Жиры, г",
        },
        {
            id: "carbohydrates",
            name: "Углеводы, г",
        },
    ];

    return ingredient && (
        <div className={style.IngredientDetails__container}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className={"pt-4 text text_type_main-medium"}>
                {ingredient.name}
            </p>
            <div className={`pt-8 pb-15 ${style.IngredientDetails__nutrients}`}>
                {nutrients.map((nutrient) => {
                    return (
                        <div key={nutrient.id}>
                            <p className={"text text_type_main-small"}>
                                {nutrient.name}
                            </p>
                            <p className={"text text_type_digits-default"}>
                                {ingredient[nutrient.id]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    modal: PropTypes.bool,
};

export default IngredientDetails;
