/* eslint-disable import/prefer-default-export */
import { SET_PRODUCT_LIST } from "./types/productTypes";

export const setProduct = (payload) => ({
    type: SET_PRODUCT_LIST,
    payload
});
export const sort = (type) => ({
    type
});
