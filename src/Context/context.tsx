import React, {createContext, useContext, useReducer} from "react";
import {AuthReducer, initialState, LoginStateType} from "../Redux/Auth/reducers";

const AuthStateContext = createContext<LoginStateType | null>(null);
const AuthDispatchContext = createContext<any>(null);

export function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === null) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === null) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
