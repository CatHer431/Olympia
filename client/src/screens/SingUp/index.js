/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import request from "utils/request";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import { TOAST_TYPE } from "constants/global";
import { useAuthenticated, useToast } from "hooks";

import loginimg from "assets/icons/welcome.svg";
import googleimg from "assets/icons/google.svg";
import facebookimg from "assets/icons/facebook-svgrepo-com.svg";

import classes from "./SingUp.module.scss";
// import { useNavigate } from "react-router-dom";

const cx = classNames.bind(classes);

const schema = yup.object({
    firstname: yup.string()
        .required("First Name is required")
        .min(2, "Please enter first name with at least 2 characters"),
    lastname: yup.string()
        .required("Last Name is required")
        .min(2, "Please enter last name with at least 2 characters"),
    email: yup.string()
        .required("Email is required")
        .email("Please enter vaild Email Address"),
    password: yup.string()
        .required("Password is required")
        .min(10, "Please enter a password with at least 10 characters")
});

function SingUp() {
    const authAccess = useAuthenticated();
    const toast = useToast();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    //  const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await authAccess.googleSingIn();
        } catch (error) {
            const message = error?.email || error?.message;
            toast(message, null, TOAST_TYPE.ERROR);
        }
    };
    const handleSingUpEmail = async (data) => {
        try {
            const params = {
                email: data.email,
                password: data.password,
                firstName: data.firstname,
                lastName: data.lastname
            };
            await request.post("signup", params);
            toast("Signup Success", null, TOAST_TYPE.SUCCESS);
            navigate("/login");
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
                    <form className={cx("login-form__container")} onSubmit={handleSubmit(handleSingUpEmail)}>
                        <div className={cx("login-form__content")}>
                            <h2>Join with us</h2>
                            <div className={cx("form-group")}>
                                <label className="d-block" htmlFor="firstname">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className={cx("form-control", { "is-invalid": errors?.firstname })}
                                    placeholder="Enter your first name"
                                    {...register("firstname")}
                                />
                                {errors?.firstname && (
                                    <div className="d-block invalid-feedback">
                                        {errors?.firstname?.message}
                                        {" "}
                                    </div>
                                )}
                            </div>
                            <div className={cx("form-group")}>
                                <label className="d-block" htmlFor="lastname">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className={cx("form-control", { "is -invalid": !!errors?.lastname })}
                                    placeholder="Enter your last name"
                                    {...register("lastname")}
                                />
                                {errors?.lastname && (
                                    <div className="d-block invalid-feedback">
                                        {errors?.lastname?.message}
                                        {" "}
                                    </div>
                                )}
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
                                Register
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
