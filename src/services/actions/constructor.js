// Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
    "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const INCREASE_INGREDIENT_COUNTER = "INCREASE_INGREDIENT_COUNTER";
export const REPLACE_INGREDIENTS = "REPLACE_INGREDIENTS";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const replaceItems = (dragIndex, hoverIndex) => {
    return function (dispatch) {
        dispatch({
            type: REPLACE_INGREDIENTS,
            payload: {
                dragIndex: dragIndex,
                hoverIndex: hoverIndex,
            },
        });
    };
};
