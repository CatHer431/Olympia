/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useEffect } from "react";
// import React from "react";
// import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import request from "utils/request";
import Layout from "components/Layout";
// import RoomCard from "components/RoomCard/RoomCard";
import ReservationCard from "components/ReservationCard/ReservationCard";
// import axios from "axios";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";
import classes from "./MyReservation.module.scss";

const cx = classNames.bind(classes);

function MyReservation() {
    const toast = useToast();
    const [reservationData, setReservationData] = useState([]);
    const email = localStorage.getItem("email") ? localStorage.getItem("email").replace(/"/g, "") : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (email) {
                    const response = await request.get(
                        `paid-reservation?email=${(email)}`
                    );
                    const modifiedReservationData = response.data.map((reservation) => {
                        const { _id, ...rest } = reservation;
                        return { id: _id, ...rest };
                    });
                    setReservationData(modifiedReservationData);
                } else {
                    const modifiedReservationData = [];
                    setReservationData(modifiedReservationData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleCancelReservation = async (reservationId, totalPrice) => {
        try {
            const response = await request.delete("reservation", { data: { id: reservationId } });
            console.log("Reservation cancelled successfully: ", response.data);
            // Filter out the cancelled reservation from the reservationData state
            const updatedReservationData = reservationData.filter(
                (reservation) => reservation.id !== reservationId
            );
            // Update the state with the new reservationData
            setReservationData(updatedReservationData);
            toast(<div>
                {`$${totalPrice} is refunded`}
                <br />
                $100 cancellation fee is made
                <br />
                Your reservation has been cancelled
            </div>, null, TOAST_TYPE.SUCCESS);
        } catch (error) {
            console.error("Failed to cancel reservation: ", error);
        }
    };

    return (
        <Layout>
            <section>
                <div className={cx("reservation-area")}>
                    <div className={cx("reservation-area__title")}>
                        <h2>Detail</h2>
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
                        </ul>
                    </div>

                </div>
                <div className={cx("container")}>
                    <div className={cx("reservation-detail")}>
                        {!email ? (
                            <div style={{ color: "red" }}>Please sign in to see your reservations</div>
                        ) : (
                            <>
                                <h1>Reservation</h1>
                                {!reservationData.length ? (
                                    <div style={{ color: "red" }}>
                                        You do not have any reservations
                                    </div>
                                ) : (
                                    reservationData.map((reservation) => (
                                        <ReservationCard
                                            key={reservation.id}
                                            data={reservation}
                                            totalPrice={reservation.totalPrice}
                                            onCancelReservation={handleCancelReservation}
                                        />
                                    ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Layout>

    );
}

export default MyReservation;
