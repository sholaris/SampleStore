import {GET_ITEMS, ITEMS_LOADING, GET_ERRORS} from '../actionTypes'

export const getProducts = () => async dispatch => {
    dispatch({type: ITEMS_LOADING});

    const products = await (await fetch('https://fakestoreapi.com/products')).json();
    const categories = await (await fetch('https://fakestoreapi.com/products/categories')).json();

    const data = {products, categories}
    dispatch({
        type: GET_ITEMS,
        payload: data
    })
    
}
