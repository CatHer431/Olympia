/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-fragments */
/* eslint-disable quote-props */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { useSelector } from "react-redux";
import { TOAST_TYPE } from "constants/global";
import { useAuthenticated, useToast } from "hooks";

import logo from "assets/images/logo-hotel.jpg";

import classNames from "classnames/bind";

import Cart from "components/Cart/Cart";
import MobileMenu from "./MobileMenu";

import classes from "./Header.module.scss";

const cx = classNames.bind(classes);

const mainNav = [
    {
        title: "English",
        path: "/"
    },
    {
        title: "List your property",
        path: "/"
    },
    {
        title: "Support ",
        path: "/hotel"
    },
    {
        title: "Trips",
        path: "/"
    }
];

const avatar = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png";

function Header() {
    const [Isactive, setIsActive] = useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [showCart, setShowCart] = React.useState(false);
    const myEmail = JSON.parse(localStorage.getItem("email"));
    // const [totalQnt, setTotalQnt] = React.useState(0);

    const { pathname } = useLocation();
    const active = mainNav.findIndex((e) => e?.path === pathname);

    // const cartItem = useSelector((state) => state?.cartReducer?.items);
    const { userDetail } = useAuthenticated();

    const toast = useToast();
    const navigate = useNavigate();
    // moblie
    const onHidderBar = React.useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);

    const handleShowCart = React.useCallback(() => {
        if (userDetail === null) {
            navigate("/login");
        } else {
            setShowCart((prev) => !prev);
        }
    }, [showCart, userDetail]);

    // logout
    const handleLogOut = () => {
        localStorage.removeItem("email");
        location.reload();
        toast("Logout Success", null, TOAST_TYPE.SUCCESS);
    };

    // scroll
    React.useEffect(() => {
        window.addEventListener(("scroll"), () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        });

        return (
            window.removeEventListener("scroll", null)
        );
    }, []);

    // React.useEffect(() => {
    //     const totalQuantity = cartItem.reduce((prev, current) => prev + current.qnt, 0);
    //     setTotalQnt(totalQuantity);
    // }, [cartItem]);

    // fullname

    const fullname = React.useMemo(
        () => `${userDetail?.firstname ?? ""}  ${userDetail?.lastname ?? ""} `,
        [userDetail]
    );

    return (
        <Fragment>
            <div
                className={cx("header-container", { "is-sticky": isShow })}
            >
                <div className="container">
                    <div className={cx("header-content")}>
                        <div className={cx("header-mennu-toggle")} onClick={() => setIsActive(true)}>
                            <i className="bx bx-menu" />
                        </div>
                        <div className={cx("header-logo")}>
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={cx("menu__left-item")}>
                            <Link to="/" className={cx("item-link-left")}>
                                <i className="fa-regular fa-earth-americas" />
                                Olympia
                            </Link>
                        </div>
                        <div className={cx("menu__right")}>
                            <div className={cx("menu__left")}>
                                {
                                mainNav.map((item, index) => (
                                    <div key={index} className={cx("menu__left-item")}>
                                        <Link to={item?.path} className={cx("item-link", { "is-active": active === index })}>
                                            {item?.title}
                                        </Link>
                                    </div>
                                ))
                            }
                            </div>
                            <div className={cx("header-account")}>
                                {
                                    myEmail
                                        ? (
                                            <div className={cx("sing-in")}>
                                                <img src={avatar} alt="" />
                                                <div>
                                                    {myEmail}
                                                </div>
                                                <ul className={cx("header__account-option")}>
                                                    <li
                                                        onClick={handleLogOut}
                                                        className={cx("header__account-option-item")}
                                                    >
                                                        <i className={cx("bx bx-log-in-circle")} />

                                                        <span>Logout</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                        : (
                                            <div className={cx("sing-in")}>
                                                <div className={cx("sing-in")}>
                                                    <div>
                                                        Sign In
                                                    </div>
                                                </div>
                                                <div className={cx("header__account-option")}>
                                                    <div className={cx("dropdown")}>
                                                        <h2>You can enjoy lower price</h2>
                                                        <p>Save 10% or more at thousands of properties with membership prices</p>
                                                        <Link to="/login">
                                                            <div className={cx("login")}>
                                                                Sign In
                                                            </div>
                                                        </Link>
                                                        <Link to="/register" className={cx("register")}>
                                                            <div>
                                                                Sign up, it&apos;s free
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenu
                menu={mainNav}
                isActive={Isactive}
                onClose={onHidderBar}
                logOut={handleLogOut}
                avatarURL={userDetail?.photoURL || avatar}
                name={userDetail?.displayName || fullname}
                userDetail={userDetail}
            />
            <Cart
                showCart={showCart}
                onClick={handleShowCart}
            />
        </Fragment>
    );
}

export default Header;
