/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
// import { db } from "config/config";
import { useHandleCart, useToast, useAuthenticated } from "hooks";
import Star from "components/Star/Star";
// import { useDispatch } from "react-redux";
import { TOAST_TYPE } from "constants/global";
import classes from "./ProductCard.module.scss";

const cx = classNames.bind(classes);

function ProductCard(props) {
    const { userDetail } = useAuthenticated();
    const { addToFireStore } = useHandleCart();
    const toast = useToast();
    const {
        img, name, dsc,
        rate, price, id, country
    } = props;
    const navigate = useNavigate();
    const addToCart = () => {
        if (userDetail) {
            const productInfo = {
                id, name, img, dsc, price, rate, country
            };
            const type = "increase";
            addToFireStore(userDetail?.uid, { productInfo, type });
            toast("The product has been added to cart!", null, TOAST_TYPE.SUCCESS);
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={cx("col-lg-3 col-md-4 col-sm-6 mb-3")}>
            <div className={cx("product-item")}>
                <div className={cx("product-item__img")}>
                    <img src={img} alt="" onClick={() => navigate(`/shop/${id}`, { state: props })} />
                    <div className={cx("dialog")}>
                        <div className={cx("left")}>
                            <span>Favourite</span>
                        </div>
                        <div className={cx("right")}>
                            <div className={cx("cart")} onClick={addToCart}>
                                <i className={cx("bx  bx-cart-alt")} />
                            </div>
                            <div className={cx("heart")}>
                                <i className={cx("bx bx-heart")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("product__content")} onClick={() => navigate(`/shop/${id}`, { state: props })}>
                    <p className={cx("title")}>{name}</p>
                    <p className={cx("dsc")}>{dsc}</p>
                    <div className={cx("content-footer")}>
                        <div className={cx("rate")}>
                            <Star rate={rate} />
                        </div>
                        <span style={{ fontWeight: "600" }}>{`$${price}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
