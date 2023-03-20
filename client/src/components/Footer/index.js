/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/no-array-index-key */
import React from "react";
import classNames from "classnames/bind";

import img from "assets/images/footer-img.jpg";
import classes from "./Footer.module.scss";

const cx = classNames.bind(classes);

const Week = [
    {
        name: "Product",
        time: "Policies"
    },
    {
        name: "Home",
        time: "Terms & Conditions"
    },
    {
        name: "Find Hotel",
        time: "Privacy"
    },
    {
        name: "About us",
        time: "Cookies"
    },
    {
        name: "Careers",
        time: ""
    }
];
const Week1 = [
    {
        name: "Support & FAQs",
        time: "For suppliers"
    },
    {
        name: "Your bookings",
        time: "Affiliate with us"
    },
    {
        name: "FAQs",
        time: "Expedia Partner Solutions"
    },
    {
        name: "Contact us",
        time: "Promote with us"
    },
    {
        name: "Review a property",
        time: "Travel Agents"
    }
];

function Footer() {
    return (
        <section className={cx("footer")}>
            <div
                className={cx("container")}
                style={{ paddingTop: "5rem" }}
            >
                <div className={cx("book-table")}>
                    <div className={cx("row align-items-center")}>
                        <div className={cx("col-lg-6 col-md-6 col-sm-6")}>
                            <div className="book-table__content">
                                <h2 style={{ fontWeight: "600" }}>
                                    Book A Hotel Now!
                                </h2>
                                <p>
                                    Welcome to our luxury hotel, where every guest is treated like royalty. Our hotel is situated in the heart of the city, offering stunning views of the surrounding area.
                                </p>
                                <div className={cx("book-table__btn")}>
                                    <a href="tel:+123456789">
                                        +123 456 789
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={cx("col-lg-6 col-md-6 col-sm-6 text-lg-end text-md-end mt-sm-5 mt-md-0 mt-5 ")}>
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
                <div className={cx("row")} style={{ marginTop: "50px", justifyContent: "space-around" }}>
                    <div className="col-lg-4">
                        <ul className={cx("footer-table")}>
                            {
                                Week.map((item, index) => (
                                    <li key={index}>
                                        {item.name}
                                        <span>{item.time}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <ul className={cx("footer-table")}>
                            {
                                Week1.map((item, index) => (
                                    <li key={index}>
                                        {item.name}
                                        <span>{item.time}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
