import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'
import { userReducer } from './user/reducers';

export const initialState = {
    player:{

    },
    teams:{
        a:[],
        b:[],
        c:[],
    },
    games:{
        list: [],
    },
    user:{
        isSignedIn: false,
        username: "",
        uid: "",
        role: {},
    }
}

export const createStore = (history: any) => {
    const logger = createLogger({
        collapsed: true,
        diff: true,
    })
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            user: userReducer,
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),
            thunk,
        )
    )
}