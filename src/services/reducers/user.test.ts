import {userReducer} from "./user";
import {TUserActions} from "../../utils/types";
import {IS_FAILED, IS_REQUESTING, IS_SUCCESSFUL, UPDATE_USER_DATA} from "../actions/user";

const initialState = {
    isRequesting: false,
    isFailed: false,
    isAuth: false,
    data: {
        name: '',
        email: '',
        password: ''
    }
};

describe('user reducer', () => {
    it('is requesting', () => {
        const state = {...initialState};
        const action: TUserActions = {
            type: IS_REQUESTING
        };
        const expected = {
            ...state,
            isRequesting: true,
            isFailed: false,
        };

        expect(userReducer(state, action)).toEqual(expected);
    });

    it('is failed', () => {
        const state = {...initialState};
        const action: TUserActions = {
            type: IS_FAILED
        };
        const expected = {
            ...state,
            isRequesting: false,
            isFailed: true,
        };

        expect(userReducer(state, action)).toEqual(expected);
    });

    it('is successful', () => {
        const state = {...initialState};
        const action: TUserActions = {
            type: IS_SUCCESSFUL,
            isAuth: true
        };
        const expected = {
            ...state,
            isRequesting: false,
            isAuth: action.isAuth,
        };

        expect(userReducer(state, action)).toEqual(expected);
    });

    it('is update user data', () => {
        const state = {...initialState};
        const action: TUserActions = {
            type: UPDATE_USER_DATA,
            payload: {
                email: 'anybody@anything.com',
                name: 'any body'
            }
        };

        const expected = {
            ...state,
            data: {
                ...action.payload
            }
        }

        expect(userReducer(state, action)).toEqual(expected);
    })
});
