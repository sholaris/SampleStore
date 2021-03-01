import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {TextField, Button, Grid} from '@material-ui/core'
import {ArrowForward, ArrowBack} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    DatePicker,
  } from '@material-ui/pickers'

  const useStyles = makeStyles({
    containerCenter:{
        maxWidth: '40%',
        margin: '0 auto'
    },
    cardNumber:{
        width: '100%'
    },
    cardCode:{
        width: '60%'
    },
    button:{
        marginTop: '3rem'
    },
    secondButton:{
        marginTop: '3rem',
        marginLeft: '1rem'
    }
})

const BankAccountDetails = ({previousStep, handleChange, handlePartialSubmit, values, errors}) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [inputDate, setInputDate] = useState(moment().format('MM/YYYY'));

    const classes = useStyles();

    const nextStage = e => {
        e.preventDefault();
        handlePartialSubmit(values);
    }

    const previousStage = e => {
        e.preventDefault();
        previousStep();
    }   

    const handleDateChange = (date) => {
        setSelectedDate(date)
        setInputDate(moment(date).format('MM/YYYY'))
    }

    return (
        <Grid container={true} spacing={3} justify="center" className={classes.containerCenter}>
            <Grid item={true} xs={12}>
                <Grid container={true}>
                    <TextField 
                            fullWidth
                            required
                            error={errors.cardOwner ? true:false}
                            helperText={errors.cardOwner && errors.cardOwner}
                            label="Imię na karcie"
                            name="cardOwner"
                            onChange={handleChange()}
                            defaultValue={values.cardOwner}
                            inputProps={{'maxLength': 19}}
                        />
                </Grid>
            </Grid>
            <Grid item={true} xs={12}>
                <Grid container={true}>
                    <TextField 
                            required
                            fullWidth
                            error={errors.cardNumber ? true:false}
                            helperText={errors.cardNumber && errors.cardNumber}
                            label="Numer karty kredytowej"
                            name="cardNumber"
                            onChange={handleChange()}
                            defaultValue={values.cardNumber}
                            inputProps={{'maxLength': 19}}
                        />
                </Grid>
            </Grid>
            <Grid container item spacing={3} justify="center" alignItems="baseline" xs={12}>
                <Grid item md={4} xs={12}>
                    <Grid container>
                        <TextField 
                            required
                            error={errors.securityCode ? true:false}
                            helperText={errors.securityCode && errors.securityCode}
                            label="Kod CVV"
                            name="securityCode"
                            onChange={handleChange()}
                            defaultValue={values.securityCode}
                            inputProps={{'maxLength': 3}}
                            // className={classes.cardCode}
                            />
                    </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item md={8} xs={12}>
                        <Grid container>
                                <DatePicker
                                    required
                                    fullWidth
                                    disablePast
                                    variant="inline"
                                    format="MM/YYYY"
                                    views={["year", "month"]}
                                    margin="normal"
                                    label="Data ważności karty"
                                    value={selectedDate}
                                    inputValue={inputDate}
                                    onChange={handleDateChange}
                                />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid container={true} justify="center" xs={12}>
                <Button 
                    variant="contained"  
                    startIcon={<ArrowBack/>} 
                    className={useStyles().button} 
                    onClick={previousStage}
                    >
                        Powrót
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<ArrowForward/>} 
                    className={useStyles().secondButton} 
                    onClick={nextStage}
                >
                    Kontynuuj
                </Button>
            </Grid>
        </Grid>
    )
}

BankAccountDetails.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handlePartialSubmit: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    values: PropTypes.shape({
        cardNumber: PropTypes.string.isRequired,
        securityCode: PropTypes.string.isRequired,
        cardExpiration: PropTypes.isRequired
    }),
    errors: PropTypes.objectOf(PropTypes.string)
}

export default BankAccountDetails
