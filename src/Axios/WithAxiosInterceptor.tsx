import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AxiosInstance, {axiosJwtInterceptor} from "./AxiosInstance";

type WithAxiosInterceptorProps = {
    children: JSX.Element,
};

const WithAxiosInterceptor = ({ children }: WithAxiosInterceptorProps) => {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const jwtInterceptor = axiosJwtInterceptor(navigate)

        setIsReady(true)
        return () => AxiosInstance.interceptors.response.eject(jwtInterceptor);

    }, [navigate])
    return isReady ? children : null
}

export { WithAxiosInterceptor }