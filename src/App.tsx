import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import RoutesComponent from "./Components/Routes/RoutesComponent";
import {ToastContainer} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {BASE_ROUTE, LOGIN_ROUTE, NO_AUTH_ROUTES} from "./Common/Constants";
import {ApiService} from "./HTTPService/ApiService";
import AxiosLocalStorageHelper from "./Axios/AxiosLocalStorageHelper";
import {useAuthDispatch} from './Context/context';


function App() {


    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()
    const authDispatch = useAuthDispatch()


    const navigateToLogin = () => {
        navigate(LOGIN_ROUTE, {replace: true})
    }

    const navigateToMain = () => {
        navigate(BASE_ROUTE, {replace: true})
    }

    const fetchProfile = () => {
        if (!NO_AUTH_ROUTES.includes(location.pathname)) {
            ApiService.getMe().then(({data}) => {
                setLoading(false)
                AxiosLocalStorageHelper.setUser(data)
                authDispatch({type: "UPDATE_USER", payload: data})
            }).catch(() => {
                setLoading(false)
                AxiosLocalStorageHelper.clear()
                navigateToLogin()
            })
        } else {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchProfile()
        return () => {
        }
    }, [])


    return loading ? null : (
            <div className="App">
                <RoutesComponent/>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="dark"
                />
            </div>
        )
}

export default App;
