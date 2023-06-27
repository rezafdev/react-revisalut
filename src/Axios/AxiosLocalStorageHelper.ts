import _ from "lodash";
import {UserProfileData} from "../Common/Types/types";

export default class AxiosLocalStorageHelper {
    public static clear() {
        localStorage.removeItem("token")
        // localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        localStorage.removeItem('pricingRules')
    }

    public static getToken() {
        return localStorage.getItem("token")
    }

    public static setToken(token?: string | null) {
        if (token)
            localStorage.setItem("token", token || "")
        else
            localStorage.removeItem("token")
    }

    // public static getRefreshToken() {
    //     return localStorage.getItem("refreshToken")
    // }

    // public static setRefreshToken(refreshToken?: string | null) {
    //     if (refreshToken)
    //         localStorage.setItem("refreshToken", refreshToken || "")
    //     else
    //         localStorage.removeItem("refreshToken")
    // }

    public static getUser(): UserProfileData | null {
        try {
            const str = localStorage.getItem("user")
            if (!str || _.isEmpty(str)) return null
            const obj = JSON.parse(str)
            return obj as UserProfileData
        } catch (e) {
        }
        return null
    }

    public static setUser(user?: UserProfileData | null) {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }

}
