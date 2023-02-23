import { ADD_ITEM, GET_CART, REMOVE_ITEM, GET_ITEMS, SET_USER, SET_ORDERS } from "../constants/constants";

const initialState = {
    cart: [],
    items : [],
    storedUser : [],
};


function cartReducer(state = initialState, action)  {
    switch(action.type){
        case ADD_ITEM:
            return{
                ...state,
                cart: [...state.cart, action.payload],
            };
        case REMOVE_ITEM:
            return{
                ...state,
                cart: state.cart.filter(item => item.key !== action.payload.key,
                    ),
            };
        case GET_ITEMS:
            return{
                ...state,
                items: [...state.items, action.payload]
             };
        case SET_USER:
            return{
                ...state,
                storedUser: [...state.storedUser, action.payload]
            };
            default:
            return state;
            
    }
}
export default cartReducer;