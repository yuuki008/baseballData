import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'

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
}

export const createStore = (history: any) => {
    const logger = createLogger({
        collapsed: true,
        diff: true,
    })
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history)
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),
            thunk,
        )
    )
}