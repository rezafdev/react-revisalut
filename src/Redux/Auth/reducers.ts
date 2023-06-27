import AxiosLocalStorageHelper from "../../Axios/AxiosLocalStorageHelper";
import {UserProfileData} from "../../Common/Types/types";


export type LoginStateType = {
    user: UserProfileData | null,
    loading: boolean,
    errorMessage: string | null,
    token?: string | null,
    expires_at?: string | null,

}

export const initialState: LoginStateType = {
    user: AxiosLocalStorageHelper.getUser(),
    token: AxiosLocalStorageHelper.getToken(),
    loading: false,
    errorMessage: null,
};


export const AuthReducer = (state: LoginStateType = initialState, action: any) => {
    switch (action.type) {
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
            }
        case "REQUEST_LOGIN":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_OK":
            return {
                ...state,
                loading: false,
            };
        case "OTP_VERIFY":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESSFUL":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                expires_at: null,
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
            };
        default:
            return state
    }
};
