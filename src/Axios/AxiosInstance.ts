import axios, {AxiosError, InternalAxiosRequestConfig} from "axios";
import {
    APIVERSION,
    AUTH_REFRESH_TOKEN_ENDPOINT,
    BASE_API_URL,
    LOGIN_ROUTE,
    PAYMENT_PLANS_ROUTE
} from "../Common/Constants";
import AxiosLocalStorageHelper from "./AxiosLocalStorageHelper";
import {NavigateFunction} from "react-router-dom";
import _ from 'lodash'

const AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        platform: "web",
    },
});

AxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = AxiosLocalStorageHelper.getToken();
        if (accessToken) {
            _.assign(config.headers, {
                Authorization: `Bearer ${accessToken}`,
                //"x-api-version": APIVERSION,
            })
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const axiosJwtInterceptor = (navigate?: NavigateFunction | null) =>
    AxiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError | any) => {
            const config = error?.config;
            const statusCode = error?.response?.status || 400;
            const isRefreshRequest = false //config?.url?.endsWith(AUTH_REFRESH_TOKEN_ENDPOINT) ?? false;
            if (statusCode === 402 || statusCode === 426) {
                if (navigate) {
                    navigate(PAYMENT_PLANS_ROUTE, {replace: true})
                } else {
                    window.location.href = PAYMENT_PLANS_ROUTE
                }
            } else if (statusCode === 401 && !isRefreshRequest && !config?._retry) {
                if (navigate) {
                    navigate(LOGIN_ROUTE, {replace: true})
                } else {
                    window.location.href = LOGIN_ROUTE
                }
            } else if (isRefreshRequest) {
                if (navigate) {
                    navigate(LOGIN_ROUTE, {replace: true})
                } else {
                    window.location.href = LOGIN_ROUTE
                }
            }

            return Promise.reject(error);
        }
    );

export default AxiosInstance;
