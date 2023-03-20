import React from "react";
import ButtonScroll from "./ButtonScroll/ButtonScroll";
import Footer from "./Footer";
import { Header } from "./Header";

function Layout(props) {
    const { children } = props;
    return (
        <>
            <Header />

            {children}

            <Footer />
            <ButtonScroll />
        </>

    );
}
export default Layout;
