import { ADD_TO_CART, DELETE_ALL_CART, REMOVE_TO_CART } from "./types/cartTypes";

export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
});

export const removeToCart = (payload) => ({
    type: REMOVE_TO_CART,
    payload
});

export const deleteAllCart = () => ({
    type: DELETE_ALL_CART
});
