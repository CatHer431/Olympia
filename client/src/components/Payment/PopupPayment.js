/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import "./PopupPaymentStyle.css";
import Payment from "./Payment";

function PopupPayment(props) {
    const {
        data, onPayment, onCancelReservation, handleClose
    } = props;
    return (
        <div className="popup-box">
            <div className="box">
                <h4>There is a $100 cancellation fee</h4>
                <span className="close-icon" onClick={handleClose}>x</span>
                <Payment data={data} onPayment={onPayment} onCancelReservation={onCancelReservation} />
            </div>
        </div>
    );
}

export default PopupPayment;
