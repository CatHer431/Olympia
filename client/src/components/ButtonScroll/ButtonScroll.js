/* eslint-disable quote-props */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/button-has-type */
import React from "react";
import classNames from "classnames/bind";

import classes from "./ButtonScroll.module.scss";

const cx = classNames.bind(classes);

function ButtonScroll() {
    const [active, setActive] = React.useState(false);

    const HandleButtonScroll = () => {
        window.scroll(0, 0);
        // setActive(false);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
        return window.removeEventListener("scroll", null);
    }, []);
    return (
        <button className={cx("button-back", { "is-active": active })} onClick={HandleButtonScroll}>
            <i className={cx("bx bx-chevron-up")} />
        </button>
    );
}
{ /* <i class='bx bxs-chevrons-up bx-fade-down' ></i> */ }

export default ButtonScroll;
