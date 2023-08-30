const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

const recieveIngredients = () => {
    return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

function recieveOrderNumber(ingredients) {
    return fetch(
        `${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients,
            }),
        })
        .then(checkResponse);
}

export {
    recieveIngredients,
    recieveOrderNumber
}