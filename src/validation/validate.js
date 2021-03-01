import {validateEmail, validatePassword , validatePostalCode, validateCreditCard, validateSecurityCode, validatePhone} from './utils'
import errorTypes from './errorTypes'


const validate = values => {
    delete values.apartment;
    const {empty_field_error, email_error, short_password_error , phone_error, wrong_postalcode_error, less_characters_error, shipping_error, security_code_error, credit_card_error} = errorTypes;
    const fields = Object.keys(values);
    let errors = {};

    if(values.email && !validateEmail(values.email)) errors['email'] = email_error;
    if(values.password && !validatePassword(values.password)) errors['password'] = short_password_error;
    if(values.postalCode && !validatePostalCode(values.postalCode)) errors['postalCode'] = wrong_postalcode_error;
    if(values.phoneNumber && !validatePhone(values.phoneNumber)) errors['phoneNumber'] = phone_error;
    
    fields.forEach(field => {
        if(values[field] === '' && field === 'shipping') errors[field] = shipping_error;
        else if(values[field] === '') errors[field] = empty_field_error;
        else if(values[field].length >= 1 && values[field].length < 2) errors[field] = less_characters_error
    })
    
    if(values.cardNumber && !validateCreditCard(values.cardNumber)) errors['cardNumber'] = credit_card_error;
    if(values.securityCode && !validateSecurityCode(values.securityCode)) errors['securityCode'] = security_code_error;

    return errors
}

export default validate
