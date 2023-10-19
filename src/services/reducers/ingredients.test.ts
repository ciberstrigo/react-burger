import {ingredientsReducer} from "./ingredients";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/getIngredients";
import {TIngredientsActions} from "../../utils/types";
import {beefMeteorite, bunR2D3, miniSalad, sauceWithSpikes} from "./test-data";

const initialState = {
    ingredients: [],
};

describe('ingredients reducer', () => {
    it('get ingredients request', () => {
        const state = {...initialState};
        const action: TIngredientsActions = {
            type: GET_INGREDIENTS_REQUEST
        };

        const expected = {...state};
        expect(ingredientsReducer(state, action)).toEqual(expected);
    });

    it('request success', () => {
        const state = {...initialState};
        const action: TIngredientsActions = {
            type: GET_INGREDIENTS_SUCCESS,
            data: [bunR2D3, sauceWithSpikes, beefMeteorite, miniSalad]
        };

        const expected = {
            ...state,
            ingredients: action.data
        };
        expect(ingredientsReducer(state, action)).toEqual(expected);
    });

    it('request failed', () => {
        const state = {...initialState};
        const action: TIngredientsActions = {
            type: GET_INGREDIENTS_FAILED
        };

        const expected = {...state};
        expect(ingredientsReducer(state, action)).toEqual(expected);
    });
})