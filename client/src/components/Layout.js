import React from "react";
import ButtonScroll from "./ButtonScroll/ButtonScroll";
import Footer from "./Footer";
import { Header } from "./Header";

function Layout(props) {
    console.log("Layout props: ", props);
    const { scrollHeight, children } = props;
    console.log("Layout scrollHeight: ", scrollHeight);
    console.log("is scrollHeight: ", scrollHeight == null);
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
