import { DELETE_CURRENT_INGREDIENT } from "../actions/constructor";
import { SET_CURRENT_INGREDIENT } from "../actions/ingredientInfo";

const initialState = {
    currentIngredient: null,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.currentIngredient,
            };
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: null,
            };
        }
        default: {
            return state;
        }
    }
};
