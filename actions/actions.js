import { ADD_ITEM, GET_CART, REMOVE_ITEM, GET_ITEMS, SET_USER, SET_ORDERS } from "../constants/constants";

export const addItem = (item) =>{
    return {
        type: ADD_ITEM,
        payload: item
    }
}
export const removeItem = (item) =>{
    return{
        type: REMOVE_ITEM,
        payload: item,
    }
}
export const getItems = (data) =>{
    return{
        type: GET_ITEMS,
        payload: data,
    }
}
export const setUser = (user) =>{
    return{
        type: SET_USER,
        payload: user,
    }
}
