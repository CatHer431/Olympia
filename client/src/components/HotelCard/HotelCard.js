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
import Star from "components/Star/Star";
import iconMoon from "assets/icons/01_moon.svg";
import iconPopup from "assets/icons/mod_hotels.svg";
import imgDemo from "assets/images/demo.jpg";
// import { useDispatch } from "react-redux";
import { TOAST_TYPE } from "constants/global";
import classes from "./HotelCard.module.scss";

const cx = classNames.bind(classes);

function HotelCard(props) {
    const { userDetail } = useAuthenticated();
    const { addToFireStore } = useHandleCart();
    const toast = useToast();
    const { data } = props;
    const {
        city, name, description,
        images, rating, _id
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
    return (
        <div className={cx("col-lg-6 col-md-4 col-sm-6 mb-3")}>
            <div className={cx("product-item")}>
                <div className={cx("product-item__img")}>
                    <img src={images[0]} style={{ width: 250, height: 250 }} alt="" onClick={() => navigate(`/hotel/${_id}`, { state: props?.data })} className={cx("image")} />
                    <div className={cx("dialog")}>
                        <div className={cx("left")}>
                            <span>Favourite</span>
                        </div>
                        <div className={cx("right")}>
                            <div className={cx("heart")}>
                                <i className="bx bx-heart" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("product__content")} onClick={() => navigate(`/hotel/${_id}`, { state: props?.data })}>
                    <div className={cx("content-top")}>
                        <p className={cx("title")}>{name}</p>
                        <p className={cx("dsc")}>{city}</p>
                    </div>
                    <div className={cx("content-footer")}>
                        <div className={cx("content__left")}>
                            {/* <p>Fully refundable</p>
                            <p>Reserve now, pay later</p> */}
                            <div className={cx("icon-moon")}>
                                <img src={iconMoon} alt="" width="18px" height="18px" />
                                {" "}
                                Collect stamps
                            </div>
                            <div className={cx("rate")}>
                                <Star rate={Math.min(5, rating)} />
                            </div>
                        </div>
                        <div className={cx("content-right")} style={{ textAlign: "end" }}>
                            <span style={{ textDecoration: "line-through", marginRight: 5 }}>
                                {" "}
                                $
                                {data.min_price.originPrice}
                                {" "}
                            </span>
                            <span style={{ fontWeight: "600" }}>
                                {" "}
                                $
                                {data.min_price.currentPrice}
                                {" "}

                            </span>
                            <p style={{ fontSize: 12, marginBottom: 0 }}>for 1 night</p>
                            <p style={{ fontSize: 12 }}>includes taxes & fees</p>
                            <div style={{ fontSize: 12 }}>
                                <img src={iconPopup} alt="" width="16px" height="16px" />
                                {" "}
                                Sign in for extra savings
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
