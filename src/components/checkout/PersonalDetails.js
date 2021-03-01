import React from 'react'
import PropTypes from 'prop-types'
import {Grid, TextField, Button} from '@material-ui/core'
import {AccountCircle, AlternateEmail, Call, ArrowForward} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles({
    rootGrid:{
        width: '70%',
        margin: '0 auto',
        flexDirection:'column'
    },
    shortInput:{
        width: '70%',
    },
    button:{
        marginTop: '3rem'
    }
})


const PersonalDetails = ({handleChange, handlePartialSubmit, values, errors}) => {

    const classes = useStyles();

    const nextStage = e => {
        e.preventDefault();
        handlePartialSubmit(values)
    }

    return (
            <Grid container={true}  justify="center" alignItems="center" spacing={2} xs={12} className={classes.rootGrid}>
                <Grid container={true} item={true} justify="center" alignItems="flex-end" spacing={1} xs={12}>
                    <Grid item={true}>
                        <AccountCircle/>
                    </Grid>
                    <Grid item={true} className={classes.shortInput}>
                        <TextField 
                            required
                            fullWidth
                            name="firstName"
                            label="Imię" 
                            defaultValue={values.firstName}
                            onChange={handleChange()}
                            error={errors['firstName'] ? true:false}
                            helperText={errors['firstName'] && errors['firstName']}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} justify="center" alignItems="flex-end" xs={12}>
                    <Grid item={true}>
                        <AccountCircle/>
                    </Grid>
                    <Grid item={true} className={classes.shortInput}>
                        <TextField 
                            required
                            fullWidth
                            name="lastName"
                            label="Nazwisko" 
                            defaultValue={values.lastName}
                            onChange={handleChange()}
                            error={errors['lastName'] ? true:false}
                            helperText={errors['lastName'] && errors['lastName']}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} justify="center" alignItems="flex-end" xs={12}>
                    <Grid item={true}>
                        <AlternateEmail/>
                    </Grid>
                    <Grid item={true} className={classes.shortInput}>
                        <TextField 
                            required
                            fullWidth
                            name="email"
                            label="Email" 
                            defaultValue={values.email}
                            onChange={handleChange()}
                            error={errors['email'] ? true:false}
                            helperText={errors['email'] && errors['email']}
                            />
                    </Grid>
                </Grid>
                <Grid container={true} item={true} spacing={1} justify="center" alignItems="flex-end" xs={12}>
                    <Grid item={true}>
                        <Call/>
                    </Grid>
                    <Grid item={true} className={classes.shortInput}>
                        <TextField 
                            required
                            fullWidth
                            name="phoneNumber"
                            label="Telefon" 
                            defaultValue={values.phoneNumber}
                            placeholder="+77 111 222 333 / 111 222 333"
                            onChange={handleChange()}
                            error={errors['phoneNumber'] ? true:false}
                            helperText={errors['phoneNumber'] && errors['phoneNumber']}
                            />
                    </Grid>
                </Grid>
            <Button 
                variant="contained" 
                color="primary" 
                endIcon={<ArrowForward/>} 
                className={classes.button} 
                onClick={nextStage}
            >
                Kontynuuj
            </Button>
            </Grid>
    )
}

PersonalDetails.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handlePartialSubmit: PropTypes.func.isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
    errors: PropTypes.objectOf(PropTypes.string)
}


export default PersonalDetails
