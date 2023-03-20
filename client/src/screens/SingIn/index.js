/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import { TOAST_TYPE } from "constants/global";
import { useAuthenticated, useToast } from "hooks";
import request from "utils/request";
import loginimg from "assets/icons/welcome.svg";
import googleimg from "assets/icons/google.svg";
import facebookimg from "assets/icons/facebook-svgrepo-com.svg";

import classes from "./SingIn.module.scss";
// import { useNavigate } from "react-router-dom";

const schema = yup.object({
    email: yup.string()
        .required("Email is required")
        .email("Please enter vaild Email Address"),
    password: yup.string()
        .required("Password is required")
        .min(10, "Please enter a password with at least 10 characters")
});

const cx = classNames.bind(classes);

function SingUp() {
    const authAccess = useAuthenticated();
    const toast = useToast();
    const navigate = useNavigate();
    //  const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleLogin = async () => {
        try {
            await authAccess.googleSingIn();
        } catch (error) {
            const message = error?.email || error?.message;
            toast(message, null, TOAST_TYPE.ERROR);
        }
    };

    const sinInEmail = async (data) => {
        try {
            const params = {
                email: data.email,
                password: data.password
            };
            await request.post("login", params);
            localStorage.setItem("email", JSON.stringify(data.email));
            navigate("/");
            toast("Login Success", null, TOAST_TYPE.SUCCESS);
        } catch (error) {
            const message = error?.email || error?.message;
            toast(message, null, TOAST_TYPE.ERROR);
        }
    };

    return (
        <section className={cx("login-container")}>
            <div className={cx("container")}>
                <div className={cx("login-content")}>
                    <div className={cx("login-img")}>
                        <img src={loginimg} alt="" />
                    </div>
                    <form className={cx("login-form__container")} onSubmit={handleSubmit(sinInEmail)}>
                        <div className={cx("login-form__content")}>
                            <h2>Join with us</h2>
                            <div className={cx("sing-up")}>
                                <span className="me-2">Don&apos;t have account yet?</span>
                                <span className={cx("create-account")}>
                                    <Link to="/register">
                                        Create an account
                                    </Link>
                                </span>
                            </div>
                            <div className={cx("form-group")}>
                                <label className="d-block" htmlFor="email">
                                    Email Adress
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className={cx("form-control", { "is-invalid": !!errors?.email })}
                                    placeholder="Enter your email"
                                    {...register("email")}
                                />
                                {errors?.email && (
                                    <div className="d-block invalid-feedback">
                                        {errors?.email?.message}
                                        {" "}
                                    </div>
                                )}
                            </div>
                            <div className={cx("form-group")}>
                                <label className="d-block" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className={cx("form-control", { "is-invalid": !!errors?.password })}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                {errors?.password && (
                                    <div className="d-block invalid-feedback">
                                        {errors?.password?.message}
                                        {" "}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-warning w-100">
                                Login
                            </button>
                        </div>
                        <div className={cx("login-other")}>
                            <div className={cx("separate")}>
                                <span>
                                    or
                                </span>
                            </div>
                            <div className={cx("login-dialog")}>
                                <button type="button" className={cx("lgoin-google")} onClick={() => handleLogin()}>
                                    <span>
                                        <img src={googleimg} alt="" />
                                        Log in with google
                                    </span>
                                </button>
                                <button type="button" className={cx("lgoin-facebook")}>
                                    <span>
                                        <img src={facebookimg} alt="" />
                                        Log in with facebook
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SingUp;
