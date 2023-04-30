/* eslint-disable object-curly-newline */
import React from "react";
import classNames from "classnames/bind";
import classes from "./ReservationCard.module.scss";

const cx = classNames.bind(classes);

function ReservationCard(props) {
    const { data, onCancelReservation } = props;
    const {
        hotel,
        startDate,
        totalDate,
        totalPrice,
        id
    } = data;
    const { name, images } = hotel;
    console.log("startDate: ", startDate);
    const checkIn = new Date(startDate);
    const options = { timeZone: "EDT", month: "long", day: "numeric", year: "numeric" };
    let formattedCheckIn = checkIn.toLocaleDateString("en-US", {
        options
    });
    const regex = /^(\d{4})-(\d{2})-(\d{2})T.*$/;
    const match = regex.exec(startDate);

    if (match) {
        const month = match[2];
        const day = match[3];
        const year = match[1];
        formattedCheckIn = `${month}/${day}/${year}`;
        console.log(formattedCheckIn);
    } else {
        console.error("Invalid date string");
    }
    return (
        <div className={cx("content")}>
            <img src={images[0]} alt="hotel" />
            <div className={cx("content-card")}>
                <div className={cx("content-information")}>
                    <div>{name}</div>
                    <div>
                        <ul>
                            <li>
                                Check In:
                                {" "}
                                {formattedCheckIn}
                            </li>
                            <li>
                                Duration:
                                {" "}
                                {totalDate}
                            </li>
                        </ul>
                    </div>
                    <div>
                        $
                        {" "}
                        {totalPrice.toFixed(2)}
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={() => onCancelReservation(id)}>Cancel Reservation</button>
                </div>
            </div>
        </div>
    );
}

export default ReservationCard;
