/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-first-prop-new-line */
import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBInput,
    MDBRow
} from "mdb-react-ui-kit";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
// import classNames from "classnames/bind";
// import Icon from "./Icon";
// import classes from "./Payment.module.scss";

// const cx = classNames.bind(classes);

export default function Payment(props) {
    const toast = useToast();
    const { data, onPayment } = props;
    console.log("data: ", data);
    const [cardNumber, setCardNumber] = useState("");
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [expire, setExpire] = useState("");
    const [expireValid, setExpireValid] = useState(false);
    const [cvv, setCvv] = useState("");
    const [cvvValid, setCvvValid] = useState(false);

    const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState("");
    const [cardExpireErrorMessage, setCardExpireErrorMessage] = useState("");
    const [cardCvvErrorMessage, setCardCvvErrorMessage] = useState("");

    const handleCardNumberChange = (event) => {
        const cardNumberValue = event.target.value;
        setCardNumber(cardNumberValue);

        if (!/^\d+$/.test(cardNumberValue)) {
            setCardNumberErrorMessage("Card number should contain only numbers");
        } else if (cardNumberValue.length < 16) {
            setCardNumberErrorMessage("Card number should be at least 16 digits long");
        } else {
            setCardNumberErrorMessage("");
        }

        setCardNumberValid(/^\d+$/.test(cardNumberValue) && cardNumberValue.length >= 16);
    };

    const handleExpireChange = (event) => {
        const expireValue = event.target.value;
        setExpire(expireValue);
        if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expireValue)) {
            setCardExpireErrorMessage("Please enter a valid expiration date in the format MM/YYYY");
        } else {
            setCardExpireErrorMessage("");
        }
        setExpireValid(/^(0[1-9]|1[0-2])\/\d{4}$/.test(expireValue));
    };

    const handleCvvChange = (event) => {
        const cvvValue = event.target.value;
        setCvv(cvvValue);
        if (!(cvvValue.length === 3 || cvvValue.length === 4)) {
            setCardCvvErrorMessage("CVV must be 3 or 4 digits");
        } else {
            setCardCvvErrorMessage("");
        }
        setCvvValid(cvvValue.length === 3 || cvvValue.length === 4);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (cardNumberValid && expireValid && cvvValid) {
            try {
                await onPayment(data);
                toast("Your reservation has been paid", null, TOAST_TYPE.SUCCESS);
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/my-reservation";
                }, 3000); // redirect after 3 seconds
            } catch (error) {
                console.error("Failed to make a payment: ", error);
                toast("Failed to make a payment", null, TOAST_TYPE.ERROR);
            }
        } else {
            alert("Please fill in all the payment details.");
        }
    };
    // const jsxConfig = {
    //     throwIfNamespace: false
    // };
    return (
        <MDBRow className="d-flex justify-content-center">
            {/* <div className={cx("credit-card-box")}>
                <div className={cx("flip")}>
                    <div className={cx("front")}>
                        <div className={cx("chip")}></div>
                        <div className={cx("logo")}>
                            <Icon style={{
                                width: "100 %",
                                height: "auto",
                                fill: "#fff"
                            }}
                            />
                        </div>
                        <div className={cx("number")}></div>
                        <div className={cx("card-holder")}>
                            <label>Card holder</label>
                            <div></div>
                        </div>
                        <div className={cx("card-expiration-date")}>
                            <label>Expires</label>
                            <div></div>
                        </div>
                    </div>
                    <div className={cx("back")}>
                        <div className={cx("strip")}></div>
                        <div className={cx("logo")}>
                            <Icon
                                style={{
                                    width: "100 %",
                                    height: "auto",
                                    fill: "#fff"
                                }}
                            />

                        </div>
                        <div className={cx("ccv")}>
                            <label>CCV</label>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div> */}
            <MDBCol>
                <MDBCard style={{ border: 0 }}>
                    {/* <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-forms/img1.webp"
                        position="top"
                        alt="..."
                    /> */}
                    {/* <MDBCardBody>
                        <MDBCardTitle className="d-flex justify-content-between mb-0">
                            <p className="text-muted mb-0">Retro Chair</p>
                            <p className="mb-0">$760</p>
                        </MDBCardTitle>
                    </MDBCardBody> */}
                    <div className="rounded-bottom">
                        <MDBCardBody>
                            {" "}
                            <p className="mb-4">Your payment details</p>
                            <MDBInput
                                label="Card Number"
                                id="form1"
                                type="text"
                                placeholder="1234 5678 1234 5678"
                                wrapperClass="mb-3"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                invalid={!cardNumberValid}
                            />
                            {cardNumberErrorMessage && (
                                <div className="text-danger" style={{ marginTop: "-30px", marginBottom: "30px", fontSize: "0.75rem" }}>
                                    {cardNumberErrorMessage}
                                </div>
                            )}

                            <MDBRow className="mb-3">
                                <MDBCol size="6">
                                    <MDBInput
                                        label="Expire"
                                        id="form2"
                                        type="text"
                                        placeholder="MM/YYYY"
                                        wrapperClass="mb-3"
                                        value={expire}
                                        onChange={handleExpireChange}
                                        invalid={!expireValid}
                                    />
                                    {cardExpireErrorMessage && (
                                        <div className="text-danger" style={{ marginTop: "-30px", marginBottom: "30px", fontSize: "0.75rem" }}>
                                            {cardExpireErrorMessage}
                                        </div>
                                    )}
                                </MDBCol>
                                <MDBCol size="6">
                                    <MDBInput
                                        label="CVV"
                                        id="form4"
                                        type="password"
                                        placeholder="CVV"
                                        wrapperClass="mb-3"
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        invalid={!cvvValid}
                                    />
                                    {cardCvvErrorMessage && (
                                        <div className="text-danger" style={{ marginTop: "-30px", marginBottom: "30px", fontSize: "0.75rem" }}>
                                            {cardCvvErrorMessage}
                                        </div>
                                    )}
                                </MDBCol>
                            </MDBRow>
                            <button style={{
                                backgroundColor: "#198754",
                                border: "1px solid transparent",
                                padding: "0.375rem 0.75rem",
                                fontSize: "1rem",
                                borderRadius: "0.25rem",
                                color: "white",
                                borderColor: "#198754"
                            }}
                                type="submit"
                                onClick={handleSubmit}
                                disabled={!cardNumberValid || !expireValid || !cvvValid}
                            >
                                Pay now
                            </button>
                        </MDBCardBody>
                    </div>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}
