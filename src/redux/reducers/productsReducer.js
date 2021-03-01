import {ITEMS_LOADING, GET_ITEMS} from '../actionTypes'

const initialState = {
    products: [],
    categories: [],
    isLoading: false,
}

const productsReducer = (state = initialState, action) => {
    switch(action.type){
        case ITEMS_LOADING:
            return {
                ...state,
                isLoadin: true,
            }
        case GET_ITEMS:
            const {products, categories} = action.payload
            return {
                ...state,
                products,
                categories,
                isLoading: false,
            }
        default:
            return state
    }
}

export default productsReducer;