/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
// import { db } from "config/config";
import { useHandleCart, useToast, useAuthenticated } from "hooks";
// import { useDispatch } from "react-redux";
import imgDemo from "assets/images/demo.jpg";

import { TOAST_TYPE } from "constants/global";
import classes from "./RoomCard.module.scss";

const cx = classNames.bind(classes);

function RoomCard(props) {
    const { userDetail } = useAuthenticated();
    const { addToFireStore } = useHandleCart();
    const toast = useToast();
    const {
        bedAmount, name, hotelID,
        images, maxPerson, _id, price, rating
    } = props.data;
    const navigate = useNavigate();
    // const addToCart = () => {
    //     if (userDetail) {
    //         const productInfo = {
    //             id, name, img, dsc, price, rate, country
    //         };
    //         const type = "increase";
    //         addToFireStore(userDetail?.uid, { productInfo, type });
    //         toast("The product has been added to cart!", null, TOAST_TYPE.SUCCESS);
    //     } else {
    //         navigate("/login");
    //     }
    // };
    const handleClick = () => {
        if (props.checkIn && props.checkOut) {
            navigate(`/booking/${_id}`, { state: props });
        } else {
            toast("Please select time!", null, TOAST_TYPE.ERROR);
        }
    };
    return (
        <div className={cx("col-lg-3 col-md-4 col-sm-6 mb-3")}>
            <div className={cx("product-item")}>
                <div className={cx("product-item__img")}>
                    <img src={images[0]} alt="" onClick={handleClick} />
                    <div className={cx("dialog")}>
                        <div className={cx("left")}>
                            <span>Favourite</span>
                        </div>
                        <div className={cx("right")}>
                            <div className={cx("heart")}>
                                <i className={cx("bx bx-heart")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("product__content")} onClick={handleClick}>
                    <p className={cx("title")}>{name}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className={cx("product-commits__content")}>
                            <i className="bx bx-border-radius" />
                            <span>124 sq m</span>
                        </div>
                        <div className={cx("product-commits__content")}>
                            <i className="bx bx-water" />
                            <span>Harbor view</span>
                        </div>
                        <div className={cx("product-commits__content")}>
                            <i className="bx bx-group" />
                            <span>
                                Sleeps
                                {" "}
                                {maxPerson}
                            </span>
                        </div>
                        <div className={cx("product-commits__content")}>
                            <i className="bx bx-bed" />
                            <span>
                                {bedAmount}
                                {" "}
                                Bed
                            </span>
                        </div>
                        <div className={cx("product-commits__content")}>
                            <i className={cx("bx bx-wifi")} />
                            <span>Free WiFi</span>
                        </div>
                        <div className={cx("product-commits__content")}>
                            <i className="bx bxs-coffee-alt" />
                            <span>Free breakfast</span>
                        </div>
                    </div>
                    <div className={cx("content-footer")}>
                        <div className={cx("cost")}>
                            <span style={{ fontWeight: "600" }}>
                                {price}
                                $
                                {" "}
                            </span>
                            <span style={{ textDecoration: "line-through", marginRight: 5 }}>
                                {" "}
                                {price + 100}
                                $
                                {" "}
                            </span>
                            <p style={{ fontSize: 12, marginBottom: 0 }}>for 1 night</p>
                            <p style={{ fontSize: 12 }}>includes taxes & fees</p>
                        </div>
                        <div className={cx("button")}>
                            Reserve
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomCard;
