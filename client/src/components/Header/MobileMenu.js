/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import clasess from "./MobileMenu.module.scss";

const cx = classNames.bind(clasess);

function MobileMenu(props) {
    const {
        menu, isActive, onClose, logOut,
        avatarURL, name, userDetail
    } = props;
    return (

        <div className={cx("modal-ovelay", { "is-active": isActive })}>
            <div className={cx("backdrop")} onClick={onClose} />
            <div className={cx("menu-content", { "is-active": !!isActive })}>
                {
                    userDetail
                        ? (
                            <div className={cx("sing-in")}>
                                <img src={avatarURL} alt="" />
                                <div>
                                    {name}
                                </div>
                            </div>
                        )
                        : (
                            <Link to="/login" className={cx("sing-in")}>
                                <i className="bx bxs-user-circle" />
                                <div>
                                    Sing In
                                </div>
                            </Link>
                        )
                }
                <hr />
                <div className={cx("menu-list")}>
                    {
                        menu.map((item, index) => (
                            <Link key={index} to={item?.path} className={cx("menu-list__item")} onClick={onClose}>
                                {item?.title}
                            </Link>
                        ))
                    }
                </div>
                <hr />
                {
                    userDetail ? (
                        <div className={cx("log-out")} onClick={logOut}>
                            Log Out
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}

MobileMenu.propTypes = {
    menu: PropTypes.instanceOf(Array),
    isActive: PropTypes.bool,
    onClose: PropTypes.func
};
MobileMenu.defaultProps = {
    menu: [],
    isActive: false,
    onClose: () => { }
};

export default MobileMenu;
