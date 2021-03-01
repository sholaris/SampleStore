import {GET_ERRORS, CLEAR_ERRORS, SET_ERRORS} from '../actionTypes'

const initialState = {
    errors: {}
}

const errorsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ERRORS:
            return{
                errors: {...action.payload}
            }
        case GET_ERRORS:
            return state.errors
        case CLEAR_ERRORS:{
            return {
                errors: {}
            }
        }
        default:
            return state
    }
}

export default errorsReducer;