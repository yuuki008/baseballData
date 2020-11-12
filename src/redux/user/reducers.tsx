import { initialState } from "../store";
import * as Actions from './actions'

export const userReducer = (state = initialState.user, action:any) => {
    switch(action.type){
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return{
                ...action.payload,
            }
        default: 
            return state
    }
}
