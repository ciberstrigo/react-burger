import {TIngredient} from "./types";

const API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
}

export const refreshToken: () => Promise<any> = () => {
    return fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);

            if (options.headers) {
                (options.headers as { [key: string]: string }).authorization =
                    refreshData.accessToken;
            }

            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const receiveIngredients = () => {
    return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

function receiveOrderNumber(token: string, ingredients: Array<TIngredient>) {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': token,
        },
        body: JSON.stringify({
            ingredients,
        }),
    })
    .then(checkResponse);
}

function register({email, password, name}: { email: string, password: string, name: string }) {
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

function login({email, password}: { email: string, password: string }) {
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

function logout(token: string) {
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

function forgotPassword(email: string) {
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

function resetPassword(password: string, token: string) {
    return fetchWithRefresh(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            token
        })
    })
}

function getUserInfo(token: string) {
    return fetchWithRefresh(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
}

function updateUserInfo(token: string, data: {name: string, email: string, password: string}) {
    return fetchWithRefresh(`${API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({...data})
    })
}

export {
    receiveIngredients,
    receiveOrderNumber,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserInfo,
    updateUserInfo,
}