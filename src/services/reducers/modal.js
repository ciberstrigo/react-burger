import {
    DELETE_CURRENT_INGREDIENT,
    SET_CURRENT_INGREDIENT,
} from "../actions";

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
