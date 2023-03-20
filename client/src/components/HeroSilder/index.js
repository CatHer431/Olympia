/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React from "react";
import classNames from "classnames/bind";
import img2 from "assets/images/banner_v2.jpg";
import clasess from "./Slider.module.scss";

const cx = classNames.bind(clasess);

function HeroSLider() {
    return (
        <section className={cx("hero-slider")}>
            <div className={cx("hero-slider__item", { "is-active": true })} style={{ backgroundImage: `url(${img2})` }} />
        </section>
    );
}

export default HeroSLider;
