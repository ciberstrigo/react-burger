import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from "../actions/getIngredients";
import {TIngredientsActions} from "../../utils/types";

const initialState = {
    ingredients: [],
};

export const ingredientsReducer = (
    state = initialState,
    action: TIngredientsActions
) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.data,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...initialState,
            };
        }
        default: {
            return state;
        }
    }
};
