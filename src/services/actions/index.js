// Получение списка ингредиентов от API. Используется в компоненте BurgerConstructor.
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';

// Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
// Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

// Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

// Перестановка ингредиентов
export const REPLACE_INGREDIENTS = 'REPLACE_INGREDIENTS';

const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        })
        fetch(`${API_URL}/ingredients`)
            .then(checkResponse)
            .then(({ data }) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: data
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
                console.error("Ошибка при получении данных:", error);
            });
    }
}

export function getOrderNumber(ingredients) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });

        fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients
            }),
        })
            .then(checkResponse)
            .then(data => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: data.order.number
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                })
                console.error('Error:', error);
            });
    }
}

export const replaceItems = (dragIndex, hoverIndex) => {
    return function(dispatch) {
        dispatch({
            type: REPLACE_INGREDIENTS,
            payload: {
                dragIndex: dragIndex,
                hoverIndex: hoverIndex
            }
        })
    }
}