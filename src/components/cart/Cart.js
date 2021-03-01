import React from 'react'
import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleCart} from '../../redux/actions/cartActions'
import {Typography, Box, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import CartItem from './CartItem'

const useStyles= makeStyles((theme) => ({
    orderButton:{
        display: 'block',
        width: '25%',
        letterSpacing: '1px',
        margin: '0 auto',
        textAlign: 'center',
    },
}))

const Cart = ({cart, toggleCart}) => {
    
    const totalPrice = (products) => products.reduce((ack, product) => ack + product.amount * product.price, 0);
    const classes = useStyles();
    const {items} = cart;

    const setStorage = () => {
        const total = totalPrice(items).toFixed(2);
        const current_order = {total, items}
        localStorage.setItem("curr_order", JSON.stringify(current_order));
    }

    const handleBuyNow = () => {
        setStorage();
        toggleCart();
    }

    return (
        <Box p={3}>
            {
                items.length === 0 ? <Typography variant="subtitle1" component="p" paragraph>Brak produktów w koszyku</Typography> : (
                items.map(item => (
                    <CartItem item={item} />
                ))
            )}
            <Typography variant="h5" component="h2" paragraph>Razem: ${totalPrice(items).toFixed(2)}</Typography>
            {items.length > 0 ? <Button variant="contained" onClick={handleBuyNow} component={RouterLink} to="/checkout" className={classes.orderButton}>Kup teraz</Button> : null}
        </Box>
    )
}

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, {toggleCart})(Cart)
