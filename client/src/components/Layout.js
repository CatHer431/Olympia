/* eslint-disable object-curly-newline */
import React from "react";
import ButtonScroll from "./ButtonScroll/ButtonScroll";
import Footer from "./Footer";
import { Header } from "./Header";
// import classNames from "classnames/bind";
// import classes from "./Layout.module.scss";

// const cx = classNames.bind(classes);

function Layout(props) {
    const { scrollHeight, children } = props;
    return (
        <>
            <Header scrollHeight={scrollHeight} />

            {children}

            <Footer />
            <ButtonScroll />
        </>
    );
}
export default Layout;
