/* eslint-disable object-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import "./PopupPaymentStyle.css";
// import Payment from "./Payment";

import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBInput,
    MDBRow
} from "mdb-react-ui-kit";

function PopupPayment(props) {
    const { id, totalPrice, handleClose, onCancelReservation } = props;

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

    return (
        <div className="popup-box">
            <div className="box">
                <h4>There is a $100 cancellation fee</h4>
                <span className="close-icon" onClick={handleClose}>x</span>
                {/* <Payment data={data} onPayment={onPayment} onCancelReservation={onCancelReservation} /> */}
                <MDBRow className="d-flex justify-content-center">
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
                                    <button
                                        style={{
                                            backgroundColor: "#198754",
                                            border: "1px solid transparent",
                                            padding: "0.375rem 0.75rem",
                                            fontSize: "1rem",
                                            borderRadius: "0.25rem",
                                            color: "white",
                                            borderColor: "#198754"
                                        }}
                                        type="submit"
                                        onClick={() => onCancelReservation(id, totalPrice)}
                                        disabled={!cardNumberValid || !expireValid || !cvvValid}
                                    >
                                        Pay now
                                    </button>
                                </MDBCardBody>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    );
}

export default PopupPayment;
