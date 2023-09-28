import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";

import * as api from "../../utils/api";
import {Dispatch} from "redux";
import {NavigateFunction} from "react-router-dom";
import {AppThunk} from "../../utils/types";
import {useAppDispatch} from "../../utils/hooks";

export const IS_REQUESTING = "IS_REQUESTING";
export const IS_FAILED = "IS_FAILED";
export const IS_SUCCESSFUL = "IS_SUCCESSFUL";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export function register(
    {email, password, name}: { email: string, password: string, name: string }
): AppThunk {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });
        api.register({ email, password, name })
            .then((res) => {
                if (res.success) {
                    dispatch({ type: IS_SUCCESSFUL, isAuth: true });
                    setCookie("accessToken", res.accessToken, {
                        expires: 20 * 60,
                    });
                    setCookie("refreshToken", res.refreshToken);
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export function loginning(
    {email, password}: { email: string, password: string }
): AppThunk {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });
        api.login({ email, password })
            .then((res) => {
                if (res.success) {
                    dispatch({ type: IS_SUCCESSFUL, isAuth: true });
                    setCookie("accessToken", res.accessToken, {
                        expires: 20 * 60,
                    });
                    setCookie("refreshToken", res.refreshToken);
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export function loggingOut(): AppThunk {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });
        api.logout(getCookie("refreshToken"))
            .then((res) => {
                if (res.success) {
                    dispatch({ type: IS_SUCCESSFUL, isAuth: false });
                    deleteCookie("accessToken");
                    deleteCookie("refreshToken");
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export const forgotPassword = (
    email: string,
    navigate: NavigateFunction
): AppThunk => {
    return function (dispatch = useAppDispatch()) {
        dispatch({ type: IS_REQUESTING });
        api.forgotPassword(email)
            .then((res) => {
                if (res.success) {
                    navigate("/reset-password", {
                        replace: true,
                        state: { email: email },
                    });
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export function resetPassword(
    password: string,
    token: string,
    navigate: NavigateFunction
) {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });
        api.resetPassword(password, token)
            .then((res) => {
                if (res.success) {
                    navigate("/login");
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export function getUserInfo(
    formData?: any
): AppThunk {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });
        api.getUserInfo(getCookie("accessToken"))
            .then((res) => {
                if (res.success) {
                    dispatch({ type: UPDATE_USER_DATA, payload: { ...formData, ...res.user } });
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}

export function updateUserInfo(
    formData: { name: string; email: string; password: string; }
): AppThunk {
    return function (dispatch: Dispatch) {
        dispatch({ type: IS_REQUESTING });

        api.updateUserInfo(getCookie("accessToken"), formData)
            .then((res) => {
                if (res.success) {
                    console.log("SUCCESS");
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(() => {
                dispatch({ type: IS_FAILED });
            });
    };
}