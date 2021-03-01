import React from 'react'
import PropTypes from 'prop-types'
import {Grid, TextField, Button} from '@material-ui/core'
import {Home, Apartment, LocationCity, LocalPostOffice, ArrowForward, ArrowBack} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles({
    rootGrid:{
        width: '70%',
        margin: '0 auto'
    },
    alignRight:{
        justifyContent: window.innerWidth < 960 ? "center" : "flex-end"
    },
    alignLeft:{
        justifyContent: window.innerWidth < 960 ? "center" : "flex-start"
    },
    input:{
        width: '70%',
    },
    button:{
        marginTop: '3rem'
    },
    buttonSecond:{
        margin: '3rem 0 0 2rem'
    }
})

const AddressDetails = ({handleChange, previousStep, handlePartialSubmit, values, errors}) => {

    const classes = useStyles();

    const nextStage = e => {
        e.preventDefault();
        handlePartialSubmit(values)
    }

    const previousStage = e => {
        e.preventDefault();
        previousStep()
    }

    return (
            <Grid container={true}  justify="center" spacing={3} className={classes.rootGrid}>
                <Grid container={true} item={true} spacing={1} justify="center" alignItems="flex-end" xs={12}>
                    <Grid item={true}>
                        <Home/>
                    </Grid>
                    <Grid item={true} className={classes.input}>
                        <TextField 
                            fullWidth
                            required
                            label="Ulica" 
                            name={'street'}
                            defaultValue={values.street}
                            onChange={handleChange()}
                            helperText={errors['street'] && errors['street']}
                            error={errors['street'] ? true:false}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} className={classes.alignRight} alignItems="flex-end" md={6} xs={12}>
                    <Grid item={true}>
                        <Home/>
                    </Grid>
                    <Grid item={true} className={classes.input}>
                        <TextField 
                            fullWidth
                            required
                            label="Numer domu" 
                            name={'streetNumber'}
                            defaultValue={values.streetNumber}
                            onChange={handleChange()}
                            error={errors['streetNumber'] ? true:false}
                            helperText={errors['streetNumber'] && errors['streetNumber']}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} className={classes.alignLeft} alignItems="flex-end" md={6} xs={12}>
                    <Grid item={true}>
                        <Apartment/>
                    </Grid>
                    <Grid item={true} className={classes.input}>
                        <TextField 
                            fullWidth
                            label="Numer lokalu" 
                            name={'apartment'}
                            defaultValue={values.apartment}
                            onChange={handleChange()}
                            helperText={errors['apartment'] && errors['apartment']}
                            error={errors['apartment'] ? true:false}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} className={classes.alignRight} alignItems="flex-end" md={6} xs={12}>
                    <Grid item={true}>
                        <LocalPostOffice/>
                    </Grid>
                    <Grid item={true} className={classes.input}>
                        <TextField 
                            fullWidth
                            required
                            placeholder="np.55-450"
                            label="Kod pocztowy" 
                            name={'postalCode'}
                            defaultValue={values.postalCode}
                            onChange={handleChange()}
                            helperText={errors['postalCode'] && errors['postalCode']}
                            error={errors['postalCode'] ? true:false}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} className={classes.alignLeft} alignItems="flex-end" md={6} xs={12}>
                    <Grid item={true}>
                        <LocationCity/>
                    </Grid>
                    <Grid item={true} className={classes.input}>
                        <TextField 
                            fullWidth
                            required
                            label="Miasto" 
                            name={'city'}
                            defaultValue={values.city}
                            onChange={handleChange()}
                            helperText={errors['city'] && errors['city']}
                            error={errors['city'] ? true:false}
                            />
                    </Grid>
                </Grid>
                    <Button 
                    variant="contained" 
                    startIcon={<ArrowBack/>} 
                    className={classes.button} 
                    onClick={previousStage}
                >
                    Powrót
                </Button>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<ArrowForward/>} 
                    className={classes.buttonSecond} 
                    onClick={nextStage}
                    >
                        Kontynuuj
                    </Button>
            </Grid>
    )
}

AddressDetails.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handlePartialSubmit: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
    errors: PropTypes.objectOf(PropTypes.string)
}

export default AddressDetails
