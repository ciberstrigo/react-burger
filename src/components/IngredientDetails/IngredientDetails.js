import React from "react";
import style from "./IngredientDetails.module.css";
import types from "../../utils/types";

const IngredientDetails = ({ ingredient }) => {
    const nutrients = [
        {
            id: "calories",
            name: "Калории, ккал"
        },
        {
            id: "proteins",
            name: "Белки, г"
        },
        {
            id: "fat",
            name: "Жиры, г"
        },
        {
            id: "carbohydrates",
            name: "Углеводы, г"
        },
    ];

    return (
        <div className={style.IngredientDetails__container}>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <p className={"pt-4 text text_type_main-medium"}>{ingredient.name}</p>
            <div className={`pt-8 pb-15 ${style.IngredientDetails__nutrients}`}>
                {nutrients.map((nutrient) => {
                    return (
                        <div key={nutrient.id}>
                            <p className={"text text_type_main-small"}>{nutrient.name}</p>
                            <p className={"text text_type_digits-default"}>{ingredient[nutrient.id]}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredient: types.ingredient
};

export default IngredientDetails;