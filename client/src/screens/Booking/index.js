/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-template-curly-in-string */
import Layout from "components/Layout";
import Payment from "components/Payment/Payment";
import Card from "components/Payment/Card";
import RedeemPoints from "components/RedeemPoints/RedeemPoints";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "hooks";

import classNames from "classnames/bind";
import {
    Button, Form, Input, Select
} from "antd";
import { TOAST_TYPE } from "constants/global";
import iconMedal from "assets/icons/rosette.svg";
import request from "utils/request";
import classes from "./Booking.module.scss";

const cx = classNames.bind(classes);

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!"
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    }
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70
            }}
        >
            <Option value="1">+1</Option>
        </Select>
    </Form.Item>
);

const validatePhone = (rule, value, callback) => {
    const phoneRegex = /^(\+?1[-.\s]?)?(\([2-9][0-8][0-9]\)|[2-9][0-8][0-9])[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$/; // Change the regular expression according to the phone number format you want to allow
    if (value && !phoneRegex.test(value)) {
        callback("Please enter a valid phone number!");
    } else {
        callback();
    }
};

function Booking() {
    const [card1Visible, setCard1Visible] = useState(true);
    // const [card1Visible, setCard1Visible] = useState(false);
    const [card2Visible, setCard2Visible] = useState(false);
    const [card3Visible, setCard3Visible] = useState(false);
    // const [card3Visible, setCard3Visible] = useState(true);
    const [responseReservation, setResponseReservation] = useState();
    const { state } = useLocation();
    const [data, setData] = useState({});
    const myEmail = JSON.parse(localStorage.getItem("email"));
    const toast = useToast();
    const img = data.images?.[0];

    const handleCard1Submit = () => {
        setCard1Visible(false);
        setCard2Visible(true);
    };
    const handleCard2Submit = () => {
        setCard2Visible(false);
        setCard3Visible(true);
    };

    // setCard3Visible(true);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getData = async () => {
        const response = await request.get(`hotel/${state.data.hotelID}`);
        setData(response.data.result);
    };
    useEffect(() => {
        getData();
    }, []);

    const postData = async (params) => {
        const response = await request.post("reservation", params);
        setResponseReservation(response.data);
        console.log("response: ", responseReservation);
        // console.log("response data: ", responseReservation.data);
        toast(
            "Booking Success!",
            null,
            TOAST_TYPE.SUCCESS
        );
    };
    const checkIn = new Date(state.checkIn);
    const checkOut = new Date(state.checkOut);

    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay)); // Get the difference in days

    const discountPercent = state.data.discountPercent;
    const totalPrice = (diffDays * (state.data.price - discountPercent / 100 * state.data.price)).toFixed(2);
    console.log("totalPrice: ", totalPrice);
    const onFinish = () => {
        if (myEmail) {
            const params = {
                email: myEmail,
                room_id: state.data._id,
                start_date: state.checkIn,
                end_date: state.checkOut
            };
            postData(params);
            handleCard1Submit();
        } else {
            toast("You must SignIn to Booking!", null, TOAST_TYPE.ERROR);
        }
    };

    const handlePayment = async (reservationId) => {
        try {
            const response = await request.post(`payment?reservation_id=${reservationId}`);
            console.log("Reservation is paid successfully: ", response.data);
        } catch (error) {
            console.error("Failed to make a payment: ", error);
        }
    };
    return (
        <Layout>
            <section>
                <div className={cx("product-area")}>
                    <div className={cx("product-area__title")}>
                        <h2>Booking</h2>
                        <ul>
                            <li>
                                Home
                            </li>
                            <li>
                                <i className={cx("bx bx-happy-heart-eyes")} />
                            </li>
                            <li>
                                Hotels
                            </li>
                            <li>
                                <i className={cx("bx bx-happy-heart-eyes")} />
                            </li>
                            <li>
                                Detail
                            </li>
                            <li>
                                <i className={cx("bx bx-happy-heart-eyes")} />
                            </li>
                            <li>
                                Booking
                            </li>
                        </ul>
                    </div>

                </div>
                <div className={cx("container")} style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <h2 className={cx("title")}>{data.name}</h2>
                        <div className={cx("row")} style={{ flexWrap: "nowrap", marginBottom: "30px" }}>
                            <div className={cx("col-lg-8")}>
                                {card1Visible && (
                                    <div className={cx("step__1")}>
                                        <h4 className={cx("step")}>Step 1: Your details</h4>
                                        <div style={{
                                            paddingRight: 20, paddingLeft: 20, paddingTop: 16, paddingBottom: 24
                                        }}
                                        >
                                            <p style={{ fontSize: 12, color: "#4e4e4e" }}>Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.</p>
                                            <Form
                                                {...layout}
                                                name="nest-messages"
                                                onFinish={onFinish}
                                                style={{
                                                    maxWidth: 450
                                                }}
                                                layout="vertical"
                                                validateMessages={validateMessages}
                                            >
                                                <Form.Item
                                                    name="firstName"
                                                    label="First name"
                                                    style={{ fontWeight: "700" }}
                                                    rules={[
                                                        {
                                                            required: true
                                                        }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="lastName"
                                                    label="Last Name"
                                                    style={{ fontWeight: "700" }}
                                                    rules={[
                                                        {
                                                            required: true
                                                        }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    label="Email address"
                                                    style={{ fontWeight: "700" }}
                                                >
                                                    <Input value={myEmail} defaultValue={myEmail} disabled />
                                                </Form.Item>
                                                <Form.Item
                                                    name="phone"
                                                    label="Mobile number"
                                                    style={{ fontWeight: "700" }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your phone number!"
                                                        }, { validator: validatePhone }
                                                    ]}
                                                >
                                                    <Input
                                                        addonBefore={prefixSelector}
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item>
                                                    <button
                                                        type="submit"
                                                        size="large"
                                                        htmlType="submit"
                                                        style={{
                                                            backgroundColor: "#198754",
                                                            border: "1px solid transparent",
                                                            padding: "0.375rem 0.75rem",
                                                            fontSize: "1rem",
                                                            borderRadius: "0.25rem",
                                                            color: "white",
                                                            borderColor: "#198754"
                                                        }}
                                                    >
                                                        Book
                                                    </button>
                                                </Form.Item>
                                            </Form>
                                        </div>

                                    </div>
                                )}
                                {card2Visible && (
                                    <div className={cx("step__2")}>
                                        <h4 className={cx("step")}>Step 2: Room details</h4>
                                        <div className={cx("title")}>
                                            <h4 className={cx("title_content")}>Property amenities</h4>
                                            <div style={{ display: "flex", marginTop: 4, marginBottom: 16 }}>
                                                <div className={cx("product-commits__content")}>
                                                    <i className="bx bx-swim" />
                                                    <span>Pool</span>
                                                </div>
                                                <div className={cx("product-commits__content")}>
                                                    <i className={cx("bx bx-wifi")} />
                                                    <span>Free WiFi</span>
                                                </div>
                                                <div className={cx("product-commits__content")}>
                                                    <i className="bx bxs-parking" />
                                                    <span>Parking available</span>
                                                </div>
                                                <div className={cx("product-commits__content")}>
                                                    <i className="bx bx-spa" />
                                                    <span>Spa</span>
                                                </div>
                                                <div className={cx("product-commits__content")}>
                                                    <i className="bx bx-bath" />
                                                    <span>Bathtub</span>
                                                </div>
                                                <div className={cx("product-commits__content")}>
                                                    <i className="bx bx-restaurant" />
                                                    <span>Restaurant</span>
                                                </div>
                                            </div>
                                            <h3 className={cx("title_content")}>{state.data.name}</h3>
                                            <div className={cx("des")} style={{ display: "flex" }}>
                                                <div
                                                    className={cx("product-commits__content")}
                                                    style={{ padding: 0 }}
                                                >
                                                    <i
                                                        className={cx("bx bx-check icon-check")}
                                                        style={{ color: "#218242", fontSize: 23, marginRight: 2 }}
                                                    />
                                                    <span style={{
                                                        color: "#4e4e4e", fontSize: 14, fontWeight: "bold", marginRight: 8
                                                    }}
                                                    >
                                                        Included in your room:
                                                    </span>
                                                </div>
                                                <div
                                                    className={cx("product-commits__content")}
                                                    style={{ paddingRight: 12, paddingLeft: 20 }}
                                                >
                                                    <i
                                                        className={cx("bx bx-wifi")}
                                                        style={{ color: "#218242" }}
                                                    />
                                                    <span style={{ color: "#218242", fontSize: 13 }}>
                                                        Free Wifi
                                                    </span>
                                                </div>
                                                <div
                                                    className={cx("product-commits__content")}
                                                    style={{ padding: 0 }}
                                                >
                                                    <i className="bx bxs-coffee" style={{ color: "#218242" }} />
                                                    <span style={{ color: "#218242", fontSize: 13 }}>
                                                        Breakfast available (pay at the property)
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    size="large"
                                                    style={{
                                                        marginTop: "30px",
                                                        backgroundColor: "#198754",
                                                        border: "1px solid transparent",
                                                        padding: "0.375rem 0.75rem",
                                                        fontSize: "1rem",
                                                        borderRadius: "0.25rem",
                                                        color: "white",
                                                        borderColor: "#198754"
                                                    }}
                                                    onClick={handleCard2Submit}
                                                >
                                                    Next
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                                {card3Visible && (
                                    <div style={{ width: "500px" }}>
                                        <Card />
                                        <div className={cx("step__3")}>
                                            <div style={{ marginTop: "130px" }}>
                                                <h4 className={cx("step")}>Step 3: Your Payment</h4>
                                                {responseReservation && (
                                                    <div>
                                                        <Payment key={responseReservation._id} data={responseReservation} onPayment={handlePayment} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>or </div>
                                        <RedeemPoints totalPrice={totalPrice} />
                                    </div>
                                )}
                            </div>
                            <div
                                className={cx("detail_rooms col-lg-4")}
                                style={{
                                    marginLeft: 15, borderWidth: 1, borderColor: "#cccccc", borderRadius: 4, borderStyle: "solid", marginTop: 12, maxHeight: 590
                                }}
                            >
                                <div className={cx("content")}>
                                    <div className={cx("content__main")}>
                                        <img className={cx("content__main-img")} src={img} alt="" />
                                        <div className={cx("content__main-info")}>
                                            <span>Aparthotel</span>
                                            {data.name}
                                        </div>
                                        <div className={cx("content__main-rating")}>
                                            <span>
                                                {data.rating}
                                                .0
                                            </span>
                                            {" "}
                                            Fabulous
                                        </div>
                                        <div className={cx("content__main-top")}>
                                            <img src={iconMedal} alt="" style={{ width: 15, height: 22, marginRight: 8 }} />
                                            Location:
                                            {" "}
                                            <span>
                                                {data.rating}
                                                .0
                                                /10
                                            </span>
                                        </div>
                                        <div className={cx("booking__detail")}>
                                            <div className={cx("check")}>
                                                Check-in
                                                {" "}
                                                <span>
                                                    {" "}
                                                    <span className={cx("date")}>{state.checkIn}</span>
                                                    {" "}
                                                    (2:00 PM)

                                                </span>

                                            </div>
                                            <div className={cx("check")}>
                                                Check-out
                                                {" "}
                                                <span>
                                                    <span className={cx("date")}>{state.checkOut}</span>
                                                    {" "}
                                                    (12:00 AM)
                                                </span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={cx("total")}>
                                    <h5>Total price</h5>
                                    <p>
                                        $
                                        {totalPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Booking;
