/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable default-param-last */
import * as actionTypes from "apps/actions/types/cartTypes";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: {
            return {
                ...state, items: [...action.payload]
            };
        }
        case actionTypes.REMOVE_TO_CART: {
            const id = action.payload;
            const carts = [...state.items];
            const checkCart = carts.some((item) => item.id === id);
            if (checkCart) {
                carts.filter((item) => item.id !== id);
                console.log(carts);
            }

            return { items: [...carts] };
        }
        default:
            return state;
    }
};

export default cartReducer;
