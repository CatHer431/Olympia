/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { useAuthenticated, useHandleCart } from "hooks";

import emptyCart from "assets/icons/undraw_empty_cart_co35.svg";

import classes from "./Cart.module.scss";

const cx = classNames.bind(classes);

function CartItem(props) {
    const {
        name, qnt, img, id, price
    } = props;
    const { removeFromFirestore, addToFireStore } = useHandleCart();
    const { userDetail } = useAuthenticated();
    const handleRemoveAll = () => {
        removeFromFirestore(userDetail?.uid, id);
    };
    const addToCartStore = () => {
        const productInfo = {
            id, name, img, price
        };
        const type = "increase";
        addToFireStore(userDetail?.uid, { productInfo, type });
    };
    const removeaFromStore = () => {
        const productInfo = {
            id, name, img, price
        };
        addToFireStore(userDetail?.uid, { productInfo });
    };
    return (
        <div className={cx("cart-content-item")}>
            <div className={cx("cart-content-item__img")}>
                <img src={img || "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1"} alt="" />
            </div>
            <div className={cx("cart-content-item-body")}>
                <span className={cx("item-name")}>
                    {name || "hey"}
                </span>
                <span className={cx("item-price")}>
                    {`$${qnt * price}` || "0"}
                </span>
                <div className={cx("item-handle")}>
                    <div className={cx("item-handle__btn")} onClick={removeaFromStore}>
                        <i className={cx("bx bx-minus")} />
                    </div>
                    <span className={cx("item-handle__input")}>
                        {qnt || 1}
                    </span>
                    <div className={cx("item-handle__btn")} onClick={addToCartStore}>
                        <i className={cx("bx bx-plus")} />
                    </div>
                </div>
            </div>
            <div className={cx("item-trash")} onClick={handleRemoveAll}>
                <i className={cx("bx bxs-trash")} />
            </div>
        </div>
    );
}

function Cart({ showCart, onClick }) {
    const cartItem = useSelector((state) => state?.cartReducer?.items);
    const navigate = useNavigate();
    return (
        <div className={cx("cart-modal", { "is-active": showCart })}>
            <div className={cx("backdrop", { "is-active": showCart })} onClick={() => onClick()} />
            <div className={cx("cart-content", { "is-active": showCart })}>
                <div className={cx("cart-content-title")}>
                    <h2>
                        shopping cart
                    </h2>
                    <span className={cx("icon-close")} onClick={() => onClick()}>
                        <i className={cx("bx bx-x")} />
                    </span>
                </div>
                <div className={cx("cart-content-list")}>
                    {
                        cartItem.length > 0 ? cartItem.map((item) => (
                            <CartItem key={item?.id} {...item} />
                        )) : (
                            <div className={cx("cart-empty")}>
                                <div className={cx("cart-empty__img")}>
                                    <img src={emptyCart} alt="" />
                                </div>
                                <span>
                                    Your cart is empty😲
                                </span>
                            </div>
                        )
                    }
                </div>
                <div className={cx("cart-bottom")}>
                    <div className={cx("cart-total")}>
                        <span>
                            total
                        </span>
                        <span>

                            {
                                `${cartItem.reduce((pre, current) => current.price * current.qnt + pre, 0)}$`
                            }
                        </span>
                    </div>
                    <div className={cx("cart-btn")}>
                        <button type="button" className={cx("cart-btn__checkout")} onClick={() => { navigate("/checkout", { state: cartItem }); }}>
                            Checkout
                        </button>
                        <button type="button" className={cx("cart-btn__buy")} onClick={() => { navigate("/shop"); }}>
                            Buy More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
