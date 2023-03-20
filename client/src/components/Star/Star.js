/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-plusplus */
import React from "react";

function Star({ rate }) {
    const StarIcon = [];
    for (let i = 1; i <= rate; i++) {
        StarIcon.push(<i key={i} className="bx bxs-star" style={{ color: "#EAB224" }} />);
    }
    return (
        <>
            {StarIcon}
        </>
    );
}

export default Star;
