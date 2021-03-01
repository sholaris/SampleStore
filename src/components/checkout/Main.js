import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import {addData, nextStep, previousStep, inputChange} from '../../redux/actions/checkoutActions'
import {setErrors} from '../../redux/actions/errorActions'
import moment from 'moment'
import Steps from './Steps'
import PersonalDetails from './PersonalDetails'
import AddressDetails from './AddressDetails'
import ShippingDetails from './ShippingDetails'
import BankAccountDetails from './BankAccountDetails'
import Confirmation from './Confirmation'
import Success from './Success'
import validate from '../../validation/validate'
import * as content from '../../manifest.json'

class Main extends Component {

    // state = {
    //     step: 1,
    //     checked_id: 0,
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phoneNumber: '',
    //     street: '',
    //     streetNumber: '',
    //     apartment: '',
    //     postalCode: '',
    //     city: '',
    //     shipping: '',
    //     cardNumber: '',
    //     cardOwner: '',
    //     securityCode: '',
    //     cardExpiration: moment(),
    //     errors: {}
    // }

    // nextStep = () => {
    //     this.setState((state) => ({step: state.step + 1}))
    // }

    // previousStep = () => {
    //     this.setState((state) => ({step: state.step - 1}))
    // }
    
    // handleChange = (value = 0, date = null) => e => {
    //     date ? this.setState({
    //         cardExpiration: date
    //     }) : this.setState({
    //         checked_id: value,
    //         [e.target.name]: e.target.value
    //     })
    // }

        // partialSubmit = (values) => {
        //     const errors = validate(values)
        //     if(Object.entries(errors).length === 0){
        //         this.setState({errors: errors})
        //         this.nextStep();
        //     }
        //     else{
        //         this.setState({errors: errors})
        //     }
        // }

    handleChange = (date = null) => e => {
        if(date){
            this.props.inputChange(e.target, date)
        }
        else{
            this.props.inputChange(e.target);
        }
    }

    partialSave = values => {
        const errors = validate(values)
        if(Object.entries(errors).length === 0){
            this.props.nextStep();
        }else{
            this.props.setErrors(errors);
        }
    }
    
    render() {
        const labels = content.steps_labels
        const {errors} = this.props.errors
        const {step, firstName, lastName, email, phoneNumber, street, streetNumber, apartment, postalCode, city, shipping, cardNumber, cardOwner, securityCode, cardExpiration, checked_id} = this.props.checkout
        const personalDetails = {firstName, lastName, email, phoneNumber}
        const addressDetails = {street, streetNumber, apartment, postalCode, city}
        const shippingDetails = {shipping, checked_id}
        const paymantDetails = {cardNumber, cardOwner, securityCode, cardExpiration}
        const confirmationDetails = {...personalDetails, ...addressDetails, ...paymantDetails, shipping}
        
        switch(step){
            case 1:
                return(
                    <>
                        <Steps step={step} labels={labels}/> 
                        <Typography variant="h4" align="center" style={{marginBottom: '2rem'}}>Dane do wysyłki</Typography>
                            <PersonalDetails
                                nextStep={this.props.nextStep}
                                handleChange={this.handleChange}
                                handlePartialSubmit={this.partialSave}
                                values={personalDetails}
                                errors={errors}
                            />
                    </>
                );
            case 2:
                return(
                    <>
                        <Steps step={step} labels={labels}/> 
                        <Typography variant="h4" align="center" style={{marginBottom: '2rem'}}>Dane do wysyłki</Typography>
                        <AddressDetails
                            nextStep={this.props.nextStep}
                            previousStep={this.props.previousStep}
                            handleChange={this.handleChange}
                            handlePartialSubmit={this.partialSave}
                            values={addressDetails}
                            errors={errors}
                        />
                    </>
                )
            case 3:
                return(
                    <>
                        <Steps step={step} labels={labels}/> 
                        <Typography variant="h4" align="center" style={{marginBottom: '2rem'}}>Rodzaj dostawy</Typography>
                        <ShippingDetails
                            nextStep={this.props.nextStep}
                            previousStep={this.props.previousStep}
                            handlePartialSubmit={this.partialSave}
                            values={shippingDetails}
                            errors={errors}
                        />
                    </>
                );
            case 4:
                return(
                    <>
                        <Steps step={step} labels={labels}/> 
                        <Typography variant="h4" align="center" style={{marginBottom: '2rem'}}>Szczegóły płatności</Typography>
                        <BankAccountDetails
                            nextStep={this.props.nextStep}
                            previousStep={this.props.previousStep}
                            handleChange={this.handleChange}
                            handlePartialSubmit={this.partialSave}
                            values={paymantDetails}
                            errors={errors}
                        />
                    </>
                );
            case 5:
                return (
                    <>
                        <Steps step={step} labels={labels}/>
                        <Typography variant="h4" align="center" style={{marginBottom: '2rem'}}>Gotowe! Oto twoje zamówienie</Typography>
                        <Confirmation 
                            previousStep={this.props.previousStep} 
                            nextStep={this.props.nextStep}
                            values={confirmationDetails}/>
                    </>
                )
            case 6:
                return (<Success/>)
        }
    }
}

Main.propTypes = {
    checkout: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addData: PropTypes.func.isRequired,
    inputChange: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    addData, 
    inputChange, 
    nextStep, 
    previousStep, 
    setErrors,
}

const mapStateToProps = state => ({
    checkout: state.checkout,
    errors: state.errors,
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)