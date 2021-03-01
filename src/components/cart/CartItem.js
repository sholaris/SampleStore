import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Box, Button, Typography, Grid, IconButton } from '@material-ui/core'
import {addToCart, removeFromCart, clearProduct} from '../../redux/actions/cartActions'
import {makeStyles} from '@material-ui/styles'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    wrapper:{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid lightblue',
        marginBottom: 20,
        paddingBottom: 5,   
    },
    productInfo:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttons:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productImage:{
        width: '75%',
        objectFit: 'cover',
    },
    productTitle:{
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    trashButton:{
        position: 'absolute',
        right: theme.spacing(0),
        top: theme.spacing(0),
        padding: 0,
        fontSize: '1rem',
    },
}));

const CartItem = ({item, addToCart, removeFromCart, clearProduct}) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <Grid container spacing={2}>
                <Grid item xs={5} >
                        <img src={item.image} alt={item.title} className={classes.productImage}/>
                </Grid>
                <Grid item xs={6} justify="center">
                    <Typography variant="h5" component="h3" paragraph className={classes.productTitle}>{item.title}</Typography>
                    <Box className={classes.productInfo}>
                        <Typography variant="subtitle1" component="p" paragraph>Cena: ${item.price}</Typography>
                        <Typography variant="subtitle1" component="p" paragraph>Suma: ${(item.amount * item.price).toFixed(2)}</Typography>
                    </Box>
                    <Box className={classes.buttons}>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => removeFromCart(item.id)}
                        >-</Button>
                        <Typography variant="subtitle1" component="p">{item.amount}</Typography>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => addToCart(item, 1)}
                        >+</Button>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <IconButton className={classes.trashButton} onClick={() => clearProduct(item.id)}><FontAwesomeIcon icon={faTrashAlt}/></IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    clearProduct: PropTypes.func.isRequired,
}

export default connect(null, {addToCart, removeFromCart, clearProduct})(CartItem)
