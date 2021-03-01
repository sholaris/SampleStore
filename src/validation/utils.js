const validateEmail= email => {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegExp.test(email);
}

const validatePassword = password => {
    const passRegExp = /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?=.*[?!#@"]).{6,}$/;
    return passRegExp.test(password);
}

const validatePhone = phoneNumber => {
    const phoneRegExp = /^((\+)\d{2}(\s)?)?((\d{3}(-|\s)\d{3}(-|\s)\d{3})|(\d{9}))$/;
    // const rawNumber = phoneNumber.replace("-", "").split(" ").join("");
    return phoneRegExp.test(phoneNumber);
}

const validatePostalCode = postalCode => {
    const postalCodeRegExp = /^\d{2}\-\d{3}$/;
    return postalCodeRegExp.test(postalCode);
}

const validateCreditCard = cardNumber => {
    const cardNumberRegExp = /^(\d{16})|((\d{4}\s){3}\d{4})$/;
    const trimmedNumber = cardNumber.split(" ").join("")
    return cardNumberRegExp.test(trimmedNumber);
}

const validateSecurityCode = cardCode => {
    const securityCodeRegExp = /^\d{3}$/;
    return  securityCodeRegExp.test(cardCode);
}

export {validateEmail, validatePassword, validatePostalCode, validateCreditCard, validateSecurityCode, validatePhone}