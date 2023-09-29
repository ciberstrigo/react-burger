import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS,
} from "../actions/constructor";
import {TConstructorActions} from "../../utils/types";

const initialState = {
    ingredients: [],
};

export const constructorReducer = (
    state = initialState,
    action: TConstructorActions
) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.draggedIngredient],
            };
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            const itemToDeleteIndex = state.ingredients
                .map((item: {_id: string}) => item._id)
                .indexOf(action.id);

            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (item, index) => index !== itemToDeleteIndex,
                ),
            };
        }
        case REPLACE_INGREDIENTS: {
            const ingredientsWithoutBuns = [...state.ingredients];
            const ingredientsBuns = ingredientsWithoutBuns.splice(0, 2);

            const draggedIngredient =
                ingredientsWithoutBuns[action.payload.dragIndex];

            ingredientsWithoutBuns.splice(action.payload.dragIndex, 1);
            ingredientsWithoutBuns.splice(
                action.payload.hoverIndex,
                0,
                draggedIngredient,
            );

            return {
                ...state,
                ingredients: [...ingredientsBuns, ...ingredientsWithoutBuns],
            };
        }
        default: {
            return state;
        }
    }
};
