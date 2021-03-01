import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
} from '../actionTypes'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            if(action.payload){
                const user = {...action.payload}
                localStorage.setItem("auth_user", JSON.stringify(user))
                return{
                    ...state,
                    user,
                    isAuthenticated: true,
                    isLoading: false
                }
            }
            else{
                return {
                    ...state,
                    isAuthenticated: true
                }
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem("auth_user")
            return{
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}

export default authReducer