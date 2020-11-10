import { initialState } from '../store'
import * as Actions from './actions'

export const playerReducer = (state = initialState.player, action:any) => {
    switch(action.type){
        default: 
            return state;
    }
}
