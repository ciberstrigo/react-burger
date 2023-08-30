import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS,
} from "../actions/constructor";

const initialState = {
    ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.draggedIngredient],
            };
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            let itemToDeleteIndex = state.ingredients
                .map((item) => item._id)
                .indexOf(action.id);

            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (item, index) => index !== itemToDeleteIndex,
                ),
            };
        }
        case REPLACE_INGREDIENTS: {
            const replacedConstructorIngredients = [...state.ingredients];
            const draggedIngredient =
                replacedConstructorIngredients[action.payload.dragIndex];

            replacedConstructorIngredients.splice(action.payload.dragIndex, 1);
            replacedConstructorIngredients.splice(
                action.payload.hoverIndex,
                0,
                draggedIngredient,
            );

            return {
                ...state,
                ingredients: replacedConstructorIngredients,
            };
        }
        default: {
            return state;
        }
    }
};
