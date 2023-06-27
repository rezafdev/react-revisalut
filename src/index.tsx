import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import {WithAxiosInterceptor} from "./Axios/WithAxiosInterceptor";


import './i18n/i18n'
import {configureStore} from "./Redux/configureStore";
import {AuthProvider} from "./Context/context";


export const {store, persistor} = configureStore()


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <WithAxiosInterceptor>
                        <App/>
                    </WithAxiosInterceptor>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
