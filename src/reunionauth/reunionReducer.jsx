import {types} from '../types/types'
export const reunionReducer = (state,action) => {
    switch (action.type){
        case types.setMedia:
            return {
                ...state,
                userMedia: action.payload
            }
        case types.accept:
            return {
                ...state,
                acceptReunion:true
            }
        default: 
            return state
    }
}