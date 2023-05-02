/* eslint-disable no-nested-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import request from "utils/request";
import { useToast } from "hooks";
import { TOAST_TYPE } from "constants/global";

export default function RedeemPoints(props) {
    const { totalPrice, data, onPayment } = props;
    const toast = useToast();
    console.log("props: ", totalPrice);
    const email = localStorage.getItem("email") ? localStorage.getItem("email").replace(/"/g, "") : "";
    const [points, setPoints] = useState(0);
    const [isPaid, setIsPaid] = useState(false);

    console.log("id redeem: ", data);

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
            await onPayment(data);
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

        <div style={{
            position: "relative", top: "20px", padding: "20px 0", border: "1px solid #cccccc", borderRadius: "4px", marginBottom: "20px"
        }}
        >
            <div>
                <h4 style={{
                    padding: "16px 20px", fontSize: "20px", fontWeight: "600", lineHeight: "1.25", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#cccccc", borderTop: "none", borderRight: "none", borderLeft: "none"
                }}
                >Redeeming your Reward Points
                </h4>
                <div style={{ padding: "16px 20px" }}>
                    <div style={{ color: "red", fontSize: "0.9em" }}>Your current Reward Point: {points}</div>
                    {totalPrice * 10 > points ? <div style={{ color: "red", fontSize: "0.9em" }}>You do not have enough points to redeem</div> : (!isPaid ? (
                        <button
                            type="submit"
                            style={{
                                marginTop: "20px",
                                backgroundColor: "#198754",
                                border: "1px solid transparent",
                                padding: "0.375rem 0.75rem",
                                fontSize: "1rem",
                                borderRadius: "0.25rem",
                                color: "white",
                                borderColor: "#198754"
                            }}
                            onClick={handleRedeem}
                        >Redeem
                        </button>
                    ) : <div>Thank you for using our services</div>)}
                </div>
            </div>
        </div>

    );
}
