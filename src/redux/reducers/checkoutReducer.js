import moment from 'moment'
import {SAVE_FORM, NEXT_STEP, PREVIOUS_STEP, INPUT_CHANGE, CHECKED} from '../actionTypes'

const initialState = {
        checked_id: 0,
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        street: '',
        streetNumber: '',
        apartment: '',
        postalCode: '',
        city: '',
        shipping: '',
        cardNumber: '',
        cardOwner: '',
        securityCode: '',
        cardExpiration: moment(),
}

const checkoutReducer = (state = initialState, action) => {
    switch(action.type){
        case CHECKED:
            const {checkboxName, checkboxValue, value} = action.payload
            return{
                ...state,
                checked_id: value,
                [checkboxName]: checkboxValue
            }
        case INPUT_CHANGE:
            const {formName, formValue} = action.payload
            return{
                ...state,
                [formName]: formValue
            }
        case SAVE_FORM:
            const {formValues} = action.payload
            return {
                ...state,
                ...formValues,
                step: state.step + 1
            }
        case NEXT_STEP:
            return {
                ...state,
                step: state.step + 1
            }
        case PREVIOUS_STEP:
            return {
                ...state,
                step: state.step - 1
            }
        default:
            return state
    }
}

export default checkoutReducer;