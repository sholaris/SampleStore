import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {List, ListItem, ListItemText, Grid, Button, Paper, Typography} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import {makeStyles} from '@material-ui/styles'
import {ArrowBack} from '@material-ui/icons'
import * as content from '../../manifest.json' 
import { createOrderDocument } from '../../firebase/config'
import { setErrors } from '../../redux/actions/errorActions'

const useStyles = makeStyles((theme) => ({
    itemFlex:{
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    listItem:{
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(2),
    },
    rootGrid:{
        flexDirection: 'column',
        width: '70%',
        margin: '0 auto'
    },
    price:{
        textAlign: 'end',
    },
    button:{
        marginTop: '3rem'
    },
    secondButton:{
        marginTop: '3rem',
        marginLeft: '1rem'
    },
    itemImage:{
        width: '5rem',
        height: 'auto',
        marginRight: '16px',
    },
    paper:{
        padding: theme.spacing(3),
        margin: theme.spacing(2, 0)
    },
}))

const Confirmation = ({nextStep, previousStep, values}) => {
    const classes = useStyles()
    let {
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        street, 
        streetNumber, 
        apartment, 
        postalCode, 
        city, 
        shipping, 
        cardNumber,
        cardOwner, 
        securityCode} = values

    cardNumber = cardNumber.replace(/ /g, "").slice(12, 16);

    const {total, items} = JSON.parse(localStorage.getItem("curr_order"))
    const [orderError, setOrderError] = useState('')
    
    const handleOrderSubmit = e => {
        e.preventDefault();
        const order_details = {...values, items, total}
        try {
            createOrderDocument(order_details)
            nextStep();
        } catch (error) {
            setOrderError('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie później')
        }
    }

    const previousStage = e => {
        e.preventDefault();
        previousStep();
    }   

    return (
        <>
            <Grid container justify="center" xs={12} className={classes.rootGrid}>
                {
                    orderError ?  (
                    <Alert severity="error">
                        <AlertTitle>Błąd</AlertTitle>
                        {orderError}
                    </Alert>
                ) : null
                }
                <Paper className={classes.paper} elevation={5}>
                    <Typography variant="h5" component="h3" paragraph>Zamówiony towar</Typography>
                    <List>
                        {items.map(item => (
                            <ListItem className={classes.listItem} divider>
                                    <img src={item.image} className={classes.itemImage}/>
                                    <ListItemText primary={item.title} secondary={`Ilość: ${item.amount}`}/>
                                    <ListItemText primary={`$${item.price.toFixed(2)}`} className={classes.price}/>
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h5" component="h2" align="center">Do zapłaty: <span style={{fontWeight: 'bold'}}>{`$${total}`}</span></Typography>
                </Paper>
                <Paper className={classes.paper} elevation={5}>
                    <Typography variant="h5" component="h3">Dane do wysyłki</Typography>
                    <List>
                        <ListItem divider>
                            <ListItemText primary="Imię i Nawisko" secondary={`${firstName} ${lastName}`}/>
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="Email" secondary={email}/>
                        </ListItem>    
                        <ListItem divider>
                            <ListItemText primary="Numer telefonu" secondary={phoneNumber}/>
                        </ListItem>
                        <ListItem className={classes.itemFlex} divider>
                            <ListItemText primary="Adres odbiorcy" secondary={`${street} ${streetNumber} ${apartment && '/ ' + apartment}`} />
                            <ListItemText secondary={`${postalCode} ${city}`} />
                        </ListItem>
                        <ListItem divider>
                            <ListItemText primary="Dostawca" secondary={shipping}/>
                        </ListItem>
                        <ListItem className={classes.itemFlex} divider>
                            <ListItemText primary="Dane do płatności" secondary={`Numer karty: xxxx-xxxx-xxxx-${cardNumber}`} />
                            <ListItemText secondary={`Kod CVV: ${securityCode}`} />
                            <ListItemText secondary={`Imię na karcie: ${cardOwner}`} />
                        </ListItem>
                    </List>
                </Paper>
                <Grid container={true} justify="center" xs={12}>
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
                        className={classes.secondButton} 
                        onClick={handleOrderSubmit}
                    >
                        Zamawiam i płacę
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

Confirmation.propTypes = {
    nextStep: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    values: PropTypes.objectOf(PropTypes.string),
    errors: PropTypes.objectOf(PropTypes.string)
}


export default Confirmation
