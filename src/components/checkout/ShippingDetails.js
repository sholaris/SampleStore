import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {checked} from '../../redux/actions/checkoutActions'
import {List, ListItem, ListItemText, Checkbox, Button, Grid, Divider, FormHelperText} from '@material-ui/core'
import {ArrowForward, ArrowBack} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import * as content from '../../manifest.json'

const useStyles = makeStyles({
    listComponent:{
        width: '70%',
        margin: '0 auto'
    },
    button:{
        marginTop: '3rem'
    },
    secondButton:{
        marginTop: '3rem',
        marginLeft: '1rem'
    },
    text:{
        textAlign: "end"
    },
    image:{
        width: '10%',
        height: 'auto'
    }
})

const ShippingDetails = ({previousStep, handlePartialSubmit, values, errors, checked}) => {
    const classes = useStyles();

    const shippingMethods = content.shipping_methods;
    
    const nextStage = e => {
        e.preventDefault();
        handlePartialSubmit(values)
    }

    const previousStage = e => {
        e.preventDefault();
        previousStep();
    }   

    // const handleChecked = value => e => {
    //     checked(value)
    // }

    return (
        <>
            <List className={classes.listComponent}>
                {
                    shippingMethods.map(method => (
                        <>
                            <ListItem key={method.id} className={classes.text}>
                                <img src={method.img} alt={method.name} className={classes.image}/>
                                <ListItemText id={method.id} primary={method.price}/>                                
                                <Checkbox
                                    required
                                    edge="end"
                                    checked={method.id === values.checked_id}
                                    inputProps={{ 'name': "shipping" }}
                                    onChange={(e) => checked(method.id, e.target)}
                                    value={method.name}
                                />
                            </ListItem>
                            <Divider/>
                        </>
                    ))
                }
                <FormHelperText error>{errors.shipping}</FormHelperText>
            </List>
            <Grid container justify="center">
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
                    className={classes.secondButton} 
                    onClick={nextStage}
                    >
                        Kontynuuj
                    </Button>
            </Grid>
        </>
    )
}

ShippingDetails.propTypes = {
    handlePartialSubmit: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    values: PropTypes.shape({
        shipping: PropTypes.string.isRequired,
        checked_id: PropTypes.number.isRequired
    }),
    errors: PropTypes.objectOf(PropTypes.string),
    checked: PropTypes.func.isRequired,
}

export default connect(null, {checked})(ShippingDetails)
