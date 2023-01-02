import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from "react-router-redux";
import {applyMiddleware} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers/rootReducer";
import { createEpicMiddleware } from 'redux-observable';
import { rootEpics } from './epics/rootEpic';

function constructStore(history, preloadedState) {
    const routerPart = routerMiddleware(history);
    const epicMiddleware = createEpicMiddleware();
    const middleware = [thunkMiddleware, routerPart, epicMiddleware];

    const storeEnhancers = [applyMiddleware(...middleware)];
    const test = composeWithDevTools(...storeEnhancers);
    
    const store = configureStore({
        reducer: rootReducer,
        middleware: middleware,
        devTools: process.env.NODE_ENV !== 'production',
    });

    epicMiddleware.run(rootEpics);

    return store;
}

export default constructStore;