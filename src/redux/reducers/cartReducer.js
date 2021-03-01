import {ADD_TO_CART, REMOVE_FROM_CART, TOGGLE_CART, GET_ITEMS, CLEAR_PRODUCT} from '../actionTypes'

const initialState = {
    items: [],
    isOpen: false
};

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const {item, qty} = action.payload
            const isInCart = state.items.find(product => product.id === item.id);
            if(isInCart){
                return {
                    ...state,
                    items: state.items.map(product => product.id === item.id ? {...product, amount: product.amount + qty} : product)
                }
            }else{
                return{
                    ...state,
                    items: [...state.items, {...item, amount: qty}]
                }
            }
        case REMOVE_FROM_CART:{
            const {id} = action.payload
            return{
                ...state,
                items: state.items.reduce((ack, product) => {
                    if(product.id === id){
                        if(product.amount === 1) return ack
                        return [...ack, {...product, amount: product.amount - 1}]
                    }else{
                        return [...ack, product]
                    }
                }, [])
            }
        }
        case CLEAR_PRODUCT:{
            const {id} = action.payload
            return{
                ...state,
                items: state.items.filter(product => product.id !== id)
            }
        }
        case TOGGLE_CART:
            return{
                ...state,
                isOpen: !state.isOpen
            }
        case GET_ITEMS:
            return state.items
        default:
            return state
    }
}
export default cartReducer