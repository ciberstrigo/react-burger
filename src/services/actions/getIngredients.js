// Получение списка ингредиентов от API. Используется в компоненте BurgerConstructor.
import { receiveIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        receiveIngredients()
            .then(({ data }) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
                console.error("Ошибка при получении данных:", error);
            });
    };
};
