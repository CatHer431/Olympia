/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
import * as actionTypes from "apps/actions/types/productTypes";
import { products } from "data";

const initialState = {
    productData: products ?? ""
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT_LIST:
            return {
                ...state,
                productData: action.payload
            };
        case actionTypes.PRICE_LOW_TO_HIGH:
            return {
                productData:
                    state?.productData?.sort((a, b) => a?.price - b?.price)

            };
        case actionTypes.PRICE_HIGH_TO_LOW:
            return {
                productData: state?.productData?.sort((a, b) => b?.price - a?.price)
            };
        default:
            return state;
    }
};

export default productReducer;
