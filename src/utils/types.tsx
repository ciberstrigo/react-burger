import {ThunkAction} from "redux-thunk";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS
} from "../services/actions/constructor";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../services/actions/getIngredients";
import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../services/actions/applyOrder";
import {IS_FAILED, IS_REQUESTING, IS_SUCCESSFUL, UPDATE_USER_DATA} from "../services/actions/user";
import {RootState} from "./store";
import {Action} from "redux";

export type TIngredient = {
    readonly _id: string,
    readonly name: string,
    readonly price: number,
    readonly image: string,
    readonly image_large: string,
    readonly image_mobile: string,
    readonly calories: number,
    readonly carbohydrates: number,
    readonly fat: number,
    readonly proteins: number,
    readonly type: string,
    index: number;
    readonly uniqueId?: string
};

export type TOrder = {
    name: string,
    order: {
        number: number,
    },
    success: boolean,
}

export type TBurger = {
    bun: TIngredient,
    ingredients: Array<TIngredient>,
}

// reducers typing
// constructor
export type TAddIngredientToConstructor = {
    type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR,
    draggedIngredient: TIngredient
};

export type TDeleteIngredientFromConstructor = {
    type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    id: string
}

export type TReplaceIngredients = {
    type: typeof REPLACE_INGREDIENTS,
    payload: {
        dragIndex: number,
        hoverIndex: number
    }
}

export type TConstructorActions =
    TAddIngredientToConstructor |
    TDeleteIngredientFromConstructor |
    TReplaceIngredients;

//ingredients
export type TGetIngredientsRequest = {
    readonly type: typeof GET_INGREDIENTS_REQUEST
};

export type TGetIngredientsSuccess = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly data: Array<TIngredient>
};

export type TGetIngredientsFailed = {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions = TGetIngredientsRequest | TGetIngredientsSuccess | TGetIngredientsFailed;

// order
export type TGetOrderNumberRequest = {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export type TGetOrderNumberSuccess = {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS,
    readonly order?: number,
    readonly orderNumber: number
}

export type TGetOrderNumberFailed = {
    readonly type: typeof GET_ORDER_NUMBER_FAILED,
}

export type TOrderActions = TGetOrderNumberRequest | TGetOrderNumberSuccess | TGetOrderNumberFailed;

// user
export type TIsRequesting = {
    readonly type: typeof IS_REQUESTING
};

export type TIsFailed = {
    readonly type: typeof IS_FAILED
}

export type TIsSuccessful = {
    readonly type: typeof IS_SUCCESSFUL
    readonly isAuth: boolean
}

export type TUpdateUserData = {
    type: typeof UPDATE_USER_DATA,
    payload: {email: string, name: string}
}

export type TUserActions =
    TIsRequesting |
    TIsFailed |
    TIsSuccessful |
    TUpdateUserData;


export type TActionsTypes =
    TUserActions |
    TOrderActions |
    TIngredientsActions |
    TConstructorActions;


export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootState, unknown, Action<string>>;
