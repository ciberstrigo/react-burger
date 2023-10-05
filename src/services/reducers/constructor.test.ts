import {constructorReducer} from "./constructor";
import {v4 as uuidv4} from 'uuid';
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLEAN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS
} from "../actions/constructor";
import {TConstructorActions, TIngredient} from "../../utils/types";
import {beefMeteorite, bunR2D3, miniSalad, sauceWithSpikes} from "./test-data";

const initialState = {
    ingredients: [
        { ...bunR2D3, uniqueId: uuidv4() },
        { ...bunR2D3, uniqueId: uuidv4() },
        { ...sauceWithSpikes, uniqueId: uuidv4() },
        { ...beefMeteorite, uniqueId: uuidv4() },
    ]
};


describe('constructor reducer', () => {
    it('adds ingredient', () => {
        const state = {...initialState} as {ingredients: TIngredient[]};
        const uniqueId = uuidv4();
        const action: TConstructorActions = {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            draggedIngredient: { ...miniSalad, uniqueId: uniqueId } as TIngredient
        };

        expect(constructorReducer(state, action)).toEqual(
            {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.draggedIngredient
                ]
            }
        );
    });

    it('delete ingredient', () => {
        const state = {
            ...initialState,
            ingredients: [...initialState.ingredients]
        } as {ingredients: TIngredient[]};
        const action: TConstructorActions = {
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            id: state.ingredients[2]._id
        };

        const expected = {
            ...state
        };
        expected.ingredients.splice(2, 1);

        expect(constructorReducer(state, action)).toEqual(expected);
    });

    it('replace ingredient', () => {
        const state = {...initialState} as {ingredients: TIngredient[]};
        const action: TConstructorActions = {
            type: REPLACE_INGREDIENTS,
            payload: {
                dragIndex: 0,
                hoverIndex: 1,
            }
        };

        const expected = {
            ...state,
            ingredients: [
                state.ingredients[0],
                state.ingredients[1],
                state.ingredients[3],
                state.ingredients[2]
            ]
        };

        expect(constructorReducer(state, action)).toEqual(expected);
    });

    it('clean constructor', () => {
        const state = {...initialState} as {ingredients: TIngredient[]};
        const action: TConstructorActions = {
            type: CLEAN_CONSTRUCTOR
        };

        const expected = {
            ...state,
            ingredients: []
        }

        expect(constructorReducer(state, action)).toEqual(expected);
    });
});