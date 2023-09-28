export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
    "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const REPLACE_INGREDIENTS = "REPLACE_INGREDIENTS";

export interface IReplaceItems {
    readonly type: typeof REPLACE_INGREDIENTS,
    readonly payload: {
        dragIndex: number,
        hoverIndex: number
    }
}

export const replaceItems = (
    dragIndex: number,
    hoverIndex: number
): IReplaceItems => (
    {
        type: REPLACE_INGREDIENTS,
        payload: {
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        }
    }
);
