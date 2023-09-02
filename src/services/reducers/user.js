import {IS_REQUESTING, IS_FAILED, IS_SUCCESSFUL, UPDATE_USER_DATA} from "../actions/user";
import { getCookie } from "../../utils/cookies";

const initialState = {
    isRequesting: false,
    isFailed: false,
    isAuth: !!getCookie("accessToken"),
    data: {
        name: '',
        email: '',
        password: ''
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_REQUESTING: {
            return {
                ...state,
                isRequesting: true,
                isFailed: false,
            };
        }
        case IS_FAILED: {
            return {
                ...state,
                isRequesting: false,
                isFailed: true,
            };
        }
        case IS_SUCCESSFUL: {
            return {
                ...state,
                isRequesting: false,
                isAuth: action.isAuth,
            };
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                data: {
                    ...action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
};
