import {CLEAR_ERRORS, SET_ERRORS, GET_ERRORS} from '../actionTypes'

export const setErrors = (errors) => ({
        type: SET_ERRORS,
        payload: errors
})

export const getErrors = () => ({
    type: GET_ERRORS
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})