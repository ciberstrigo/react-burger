import {getCookie} from "./cookies";

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
    return fetch(`${API_URL}/orders`, {
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

function register({ email, password, name }) {
    return fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            name
        })
    }).then(checkResponse);
}

function login({ email, password }) {
    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(checkResponse);
}

function logout(token) {
    return fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        })
    }).then(checkResponse);
}

function forgotPassword(email) {
    return fetch(`${API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email
        })
    }).then(checkResponse)
}

function resetPassword(password, token) {
    return fetch(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            token
        })
    }).then(checkResponse)
}

function getUserInfo(token) {
    return fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }).then(checkResponse)
}

function updateUserInfo(token, data) {
    return fetch(`${API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({...data})
    }).then(checkResponse)
}

function getToken(refreshToken) {
    return fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: refreshToken
        })
    }).then(checkResponse)
}

export {
    recieveIngredients,
    recieveOrderNumber,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserInfo,
    updateUserInfo,
    getToken
}