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
import {auth, createUserDocument, googleProvider, userExist} from '../../firebase/config'

export const loadUser = () => async dispatch => {
    dispatch({type: USER_LOADING})
    auth.onAuthStateChanged(user => {
        if(user) {
            dispatch({type: USER_LOADED, payload: user})
        }else{
            dispatch({type: AUTH_ERROR})
        }
        
    })
}

export const register = ({firstName, lastName, email, password}) => async dispatch => {
    try {
        const userRegistered = await userExist(email);
        if(!userRegistered){
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const {photoURL} = user
            createUserDocument(user, {firstName, lastName})
            const createdUser = {
                email,
                firstName,
                lastName,
                photoURL,
            }
            dispatch({
                type: REGISTER_SUCCESS,
                payload: createdUser
            })
            return true;   
        }else{
            return false
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const signIn = ({email, password}) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: LOGIN_SUCCESS
        })
        return true;
        
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
        return false;
    }

}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(googleProvider)
        dispatch({
            type: LOGIN_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => ({
    type: LOGOUT_SUCCESS
})