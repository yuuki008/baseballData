import { initialState } from '../store'
import * as Actions from './actions'

export const gameReducer = (state = initialState.games, action:any) => {
    switch(action.type){
        default: 
            return state;
    }
}
