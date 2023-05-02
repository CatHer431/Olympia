/* eslint-disable no-unused-vars */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import PropTypes from "prop-types";

import classNames from "classnames/bind";
import Star from "components/Star/Star";
import { TOAST_TYPE } from "constants/global";
import { useAuthenticated, useHandleCart, useToast } from "hooks";
import { useNavigate } from "react-router-dom";
import imgDemo from "assets/images/demo.jpg";
import classes from "./ProductView.module.scss";

const cx = classNames.bind(classes);

function ProductView({ product }) {
    const {
        _id, images, name, description, city, rating, rooms, nation, district
    } = product;
    console.log("check", product);
    const [prevImg, setPrevImg] = React.useState(images[0]);

    const [qnt, setQnt] = React.useState(1);

    const { addToFireStore } = useHandleCart();

    const { userDetail } = useAuthenticated();

    const toast = useToast();
    const navigate = useNavigate();
    // const handleAddToCart = () => {
    //     if (userDetail === null) {
    //         navigate("/login");
    //     } else {
    //         const productInfo = {
    //             id,
    //             name,
    //             img,
    //             price,
    //             qnt
    //         };
    //         const type = "increase";
    //         const action = "totalAdd";

    //         addToFireStore(userDetail?.uid, { productInfo, type, action });
    //         toast(
    //             "The product has been added to cart!",
    //             null,
    //             TOAST_TYPE.SUCCESS
    //         );
    //     }
    // };

    // React.useEffect(() => {
    //     setPrevImg();
    // }, [img, product]);
    return (
        <div className={cx("product")}>
            <div className={cx("row")}>
                <div className={cx("col-lg-12")}>
                    <div
                        className={cx("product__image")}
                        style={{ height: 376 }}
                    >
                        <div
                            className={cx("product__image-main col-lg-6")}
                            style={{ height: "100%" }}
                        >
                            <img src={images[0]} alt="" />
                        </div>
                        <div
                            className={cx("product__image-list col-lg-6")}
                            style={{
                                height: 376,
                                display: "flex",
                                flexWrap: "wrap"
                            }}
                        >
                            <div
                                className={cx(
                                    "product__image-list-item col-lg-6"
                                )}
                                style={{ height: "50%", padding: 1 }}
                            >
                                <img
                                    src={images[1]}
                                    alt=""
                                />
                            </div>
                            <div
                                className={cx(
                                    "product__image-list-item col-lg-6"
                                )}
                                style={{ height: "50%", padding: 1 }}
                            >
                                <img
                                    src={images[1]}
                                    alt=""
                                />
                            </div>
                            <div
                                className={cx(
                                    "product__image-list-item col-lg-6"
                                )}
                                style={{ height: "50%", padding: 1 }}
                            >
                                <img
                                    src={images[1]}
                                    alt=""
                                />
                            </div>
                            <div
                                className={cx(
                                    "product__image-list-item col-lg-6"
                                )}
                                style={{ height: "50%", padding: 1 }}
                            >
                                <img
                                    src={images[1]}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("col-lg-12")}>
                    <div className={cx("overview")}>
                        <div
                            style={{
                                padding: 12,
                                fontSize: 13,
                                color: "#D32F2F",
                                fontWeight: "500",
                                width: 85,
                                borderBottomWidth: 2,
                                borderBottomColor: "#D32F2F",
                                borderBottomStyle: "solid"
                            }}
                        >
                            Overview
                        </div>
                    </div>

                </div>
                <div className={cx("col-lg-12")} style={{ display: "flex" }}>
                    <div
                        className={cx("product__info col-lg-6")}
                        style={{ padding: 24 }}
                    >
                        <h2 style={{ marginBottom: 0 }}>{name}</h2>
                        <div
                            className={cx("product__info-item")}
                            style={{ marginBottom: 0 }}
                        >
                            <Star rate={Math.min(5, rating)} />
                            <span>(0 Reviews)</span>
                        </div>
                        <p style={{ fontSize: 13 }}>
                            {description}
                        </p>
                        <div
                            className={cx("product-commits__content")}
                            style={{ padding: 0 }}
                        >
                            <i
                                className={cx("bx bx-check icon-check")}
                                style={{ color: "#218242" }}
                            />
                            <span style={{ color: "#218242", fontSize: 13 }}>
                                Fully refundable
                            </span>
                        </div>
                        <p
                            style={{
                                color: "#1A1C1B",
                                fontSize: 20,
                                fontWeight: "700"
                            }}
                        >
                            {rating}
                            /10 Fabulous
                        </p>
                        <p style={{ fontSize: 13 }}>
                            1,006 verified Hotels.com guest reviews
                        </p>
                        <div>
                            <h2 style={{ fontSize: 20 }}>Popular amenities</h2>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <div className={cx("product-commits__content")}>
                                    <i className={cx("bx bx-car")} />
                                    <span>Parking available</span>
                                </div>
                                <div className={cx("product-commits__content")}>
                                    <i className="bx bxs-baby-carriage" />
                                    <span>Safe for children</span>
                                </div>
                                <div className={cx("product-commits__content")}>
                                    <i className={cx("bx bx-wifi")} />
                                    <span>Free WiFi</span>
                                </div>
                                <div className={cx("product-commits__content")}>
                                    <i className="bx bx-cloud-snow" />
                                    <span>Air conditioning</span>
                                </div>
                                <div className={cx("product-commits__content")}>
                                    <i className={cx("bx bx-dumbbell")} />
                                    <span>Gym</span>
                                </div>
                                <div className={cx("product-commits__content")}>
                                    <i className={cx("bx bx-wind")} />
                                    <span>Refrigerator</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className={cx("product__info-item")}>
                            <div className={cx("product__info-item-tag")}>
                                <div className={cx("tag-category")}>
                                    <span className={cx("tag")}>
                                        Category:
                                    </span>
                                    <span className={cx("tag-item")}>
                                        Burgers
                                    </span>
                                </div>
                                <div className={cx("tag-country")}>
                                    <span className={cx("tag")}>
                                        Country:
                                    </span>
                                    <span className={cx("tag-country")}>
                                        {country}
                                    </span>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className={cx("product__info-item")}>
                            <span>{dsc}</span>
                        </div> */}
                        {/* <div className={cx("product-btn")}>
                            <div className={cx("product__info-item__quantity")}>
                                <div className={cx("product__info-item__quantity__btn")} onClick={() => qnt > 1 && setQnt((pre) => pre - 1)}>
                                    <i className={cx("bx bx-minus")} />
                                </div>
                                <span className={cx("product__info-item__quantity__input")}>
                                    {qnt <= 0 ? 1 : qnt}
                                </span>
                                <div className={cx("product__info-item__quantity__btn")} onClick={() => setQnt((pre) => pre + 1)}>
                                    <i className={cx("bx bx-plus")} />
                                </div>
                            </div>
                            <button type="button" className={cx("btn-add")} onClick={handleAddToCart}>
                                <span>
                                    <i className={cx("bx bxs-cart-add bx-tada")} />
                                </span>

                                <span>
                                    Add to cart
                                </span>
                            </button>
                            <button type="button" className={cx("btn-wishlist")}>
                                <i className={cx("bx bx-heart")} />
                            </button>
                        </div> */}
                        {/* <div className={cx("product-commits")}>
                            <div className={cx("product-commits__content")}>
                                <i className={cx("bx bxs-plane-alt")} />
                                <span>Free global shipping on all orders</span>
                            </div>
                            <div className={cx("product-commits__content")}>
                                <i className={cx("bx bx-calendar-check")} />
                                <span>2 hours easy returns if you change your mind</span>
                            </div>
                            <div className={cx("product-commits__content")}>
                                <i className={cx("bx bx-purchase-tag-alt")} />
                                <span>Order before noon for same day dispatch</span>
                            </div>
                        </div> */}
                    </div>
                    <div className={cx("col-lg-6 ")}>
                        {/* <div
                            className={cx("col-lg-8")}
                            style={{ float: "right", marginTop: 35 }}
                        >
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe
                                        width="395"
                                        height="307"
                                        id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=49 Market Street, Sydney, NSW, 2000&t=k&z=16&ie=UTF8&iwloc=&output=embed"
                                    />
                                </div>
                            </div>
                            <div className={cx("location")}>
                                {district}
                                {", "}
                                {city}
                                {", "}
                                {nation}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductView.defaultProps = {
    img: "",
    name: "",
    price: "",
    rate: "",
    dsc: "",
    country: ""
};

export default ProductView;
