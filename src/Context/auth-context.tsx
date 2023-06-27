import React, {useState} from "react";

export const AuthContext = React.createContext<any>({
    isAuth: true,
    token: "",
    login: () => {
    },
    logOut: () => {
    },
    setAccessToken: () => {
    },

})

const AuthContextProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'))
    const [token, setToken] = useState(localStorage.getItem('accessToken'))

    const loginHandler = () => {
        setIsLoggedIn(true)
    }
    const logOutHandler = () => {
        // localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    const tokenHandler = (e: any) => {
        setToken(e)
    }
    return (
        <AuthContext.Provider
            value={{
                isAuth: isLoggedIn,
                login: loginHandler,
                logOut: logOutHandler,
                token: token,
                setAccessToken: tokenHandler

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
//* This component is for passing auth state to all app pages and checking authorization in-app.