import {combineReducers} from 'redux'
import checkoutReducer from './checkoutReducer'
import cartReducer from './cartReducer'
import errorsReducer from './errorsReducer'
import authReducer from './authReducer'
import productsReducer from './productsReducer'

export default combineReducers({
    auth: authReducer,
    checkout: checkoutReducer, 
    cart: cartReducer,
    errors: errorsReducer,
});