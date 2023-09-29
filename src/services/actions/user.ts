import { getCookie, setCookie, deleteCookie } from "../../utils/cookies";

import * as api from "../../utils/api";
import {Dispatch} from "redux";
import {NavigateFunction} from "react-router-dom";
import {AppThunk} from "../../utils/types";
import {useAppDispatch} from "../../utils/hooks";
import {AppDispatch} from "../../utils/store";

export const IS_REQUESTING = "IS_REQUESTING";
export const IS_FAILED = "IS_FAILED";
export const IS_SUCCESSFUL = "IS_SUCCESSFUL";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const register: AppThunk = (
    {email, password, name}: { email: string, password: string, name: string }
) => {
    return function (dispatch: AppDispatch) {
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

export const loginning: AppThunk = (
    {email, password}: { email: string, password: string }
) => {
    return function (dispatch: AppDispatch) {
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

export const loggingOut: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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

export const forgotPassword: AppThunk = (
    email: string,
    navigate: NavigateFunction
) => {
    return function (dispatch: AppDispatch = useAppDispatch()) {
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

export const resetPassword = (
    password: string,
    token: string,
    navigate: NavigateFunction
) => {
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

export const getUserInfo: AppThunk = (
    formData?: any
) => {
    return function (dispatch: AppDispatch) {
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

export const updateUserInfo: AppThunk = (
    formData: { name: string; email: string; password: string; }
) => {
    return function (dispatch: AppDispatch) {
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
