import {ADD_TO_CART, REMOVE_FROM_CART, TOGGLE_CART, GET_ITEMS, CLEAR_PRODUCT} from '../actionTypes'

export const addToCart = (item, qty) => ({
        type: ADD_TO_CART,
        payload: {item, qty}
})

export const removeFromCart = id => ({
        type: REMOVE_FROM_CART,
        payload: {id}
})

export const clearProduct = id => ({
        type: CLEAR_PRODUCT,
        payload: {id}
})

export const toggleCart = () => ({
    type: TOGGLE_CART
})

export const getCartItems = () => ({
        type: GET_ITEMS
})