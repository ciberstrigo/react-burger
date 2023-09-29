import React, {FC} from "react";
import style from "./IngredientDetails.module.css";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks";
import {TIngredient} from "../../utils/types";

const IngredientDetails: FC = () => {
    const { ingredientId } = useParams();
    const ingredients = useAppSelector(store => {
        return store.burger.ingredientsReducer.ingredients;
    });
    const ingredient: TIngredient = ingredients.find((ingredient: TIngredient) => ingredient._id === ingredientId);
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
                                {ingredient[nutrient.id as keyof TIngredient]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IngredientDetails;
