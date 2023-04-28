/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
import React from "react";

import classNames from "classnames/bind";
import Icon from "./Icon";
import classes from "./Payment.module.scss";

const cx = classNames.bind(classes);

export default function Card() {
    return (
        <div className={cx("credit-card-box")}>
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
        </div>
    );
}
