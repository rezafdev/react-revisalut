import AxiosLocalStorageHelper from "../../Axios/AxiosLocalStorageHelper";
import {ApiService} from "../../HTTPService/ApiService";

export async function LoginUser(dispatch: any, loginPayload: any) {
    try {
        dispatch({type: "REQUEST_LOGIN"});
        let res = await ApiService.UserLogin(loginPayload);
        const {token, user} = res.data;
        if (token && user) {
            dispatch({
                type: "LOGIN_SUCCESSFUL",
                payload: {
                    user: user,
                    token: token,
                },
            });
            AxiosLocalStorageHelper.setToken(token)
            AxiosLocalStorageHelper.setUser(user)
            return res;
        }
        dispatch({type: "LOGIN_ERROR", error: "User Not Found"});
        return;
    } catch (err) {
        dispatch({type: "LOGIN_ERROR", error: "User Not Found"});
    }
}


export async function LogOutUser(dispatch: any) {
    AxiosLocalStorageHelper.clear()
    dispatch({type: "LOGOUT"});
}
