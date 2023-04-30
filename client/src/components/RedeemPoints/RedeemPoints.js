/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import request from "utils/request";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";

export default function RedeemPoints(props) {
    const { totalPrice } = props;
    const toast = useToast();
    console.log("props: ", totalPrice);
    const email = localStorage.getItem("email") ? localStorage.getItem("email").replace(/"/g, "") : "";
    const [points, setPoints] = useState(0);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await request.get(`rewardPoint?email=${(email)}`);
                setPoints(response.data.result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [email]);

    const handleRedeem = async () => {
        try {
            const response = await request.put("updatePoint", { email, rewardPoint: points - totalPrice * 10 });
            console.log("response: ", response.data.result);
            setPoints(response.data.result);
            toast(
                "Redeem Success!",
                null,
                TOAST_TYPE.SUCCESS
            );
            setIsPaid(true);
        } catch (error) {
            console.error("Failed to redeem: ", error);
        }
    };

    return (
        <>
            <h4>Redeeming your Reward Points</h4>
            <div>Your current Reward Point: {points}</div>
            {totalPrice * 10 > points ? <div>You do not have enough points to redeem</div> : (!isPaid ? <button type="submit" onClick={handleRedeem}>Redeem</button> : <div>Thank you for using our services</div>)}

        </>
    );
}
