import {legacy_createStore as createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import {rootSaga, rootReducer} from "./index";


export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const persistConfig = {
        key: 'root',
        storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const middleWares = [sagaMiddleware];
    let composer = compose;
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line global-require
        const {composeWithDevTools} = require("redux-devtools-extension");
        composer = composeWithDevTools;
    }

    const store = createStore(
        persistedReducer,
        composer(applyMiddleware(...middleWares))
    );
    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return {store, persistor};
}


export default {configureStore};