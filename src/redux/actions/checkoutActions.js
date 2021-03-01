import {SAVE_FORM, NEXT_STEP, PREVIOUS_STEP, INPUT_CHANGE, CHECKED} from '../actionTypes'

export const inputChange = (input, date = null) => {
    if(date) return {
        type: INPUT_CHANGE, 
        payload: {formName: "cardExpiration", formValue: date}}
    else return {
        type: INPUT_CHANGE, 
        payload: {formName: input.name, formValue: input.value}
    }
}

export const checked = (value, input) => ({
    type: CHECKED,
    payload: {value, checkboxName: input.name, checkboxValue: input.value}
})

export const addData = formValues => ({
        type: SAVE_FORM,
        payload: formValues
})

export const nextStep = () => ({
    type: NEXT_STEP
})

export const previousStep = () => ({
    type: PREVIOUS_STEP
})