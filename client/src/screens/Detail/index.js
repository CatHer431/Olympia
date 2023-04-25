/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { ProductCard, ProductView } from "components";
import Layout from "components/Layout";

import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchEmpty from "assets/images/no_search.svg";

import classNames from "classnames/bind";

import Search from "components/Search/Search";
import RoomCard from "components/RoomCard/RoomCard";
import SearchRoom from "components/SearchRoom/SearchRoom";
import Loading from "components/Loading";
import classes from "./Detail.module.scss";

const cx = classNames.bind(classes);

function Detail() {
    const { state } = useLocation();
    const [dataRooms, setDataRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const { rooms } = state;
    React.useEffect(() => {
        window.scrollTo(0, 0);
        setDataRooms(rooms);
    }, []);

    const handleSearch = (item) => {
        setDataRooms(item);
    };
    const onChangeCheckIn = (date) => {
        setCheckIn(date);
    };
    const onChangeCheckOut = (date) => {
        setCheckOut(date);
    };
    const handleLoading = () => {
        setLoading(true);
    };
    const handleCloseLoading = () => {
        setLoading(false);
    };
    return (
        <Layout>
            <section>
                <div className={cx("product-area")}>
                    <div className={cx("product-area__title")}>
                        <h2>Detail</h2>
                        <ul>
                            <li>
                                Home
                            </li>
                            <li>
                                <i className={cx("bx bx-happy-heart-eyes")} />
                            </li>
                            <li>
                                Hotels
                            </li>
                            <li>
                                <i className={cx("bx bx-happy-heart-eyes")} />
                            </li>
                            <li>
                                Detail
                            </li>
                        </ul>
                    </div>

                </div>
                <div className={cx("container")}>
                    <ProductView product={state} />
                    <div className={cx("product-other")}>
                        <SearchRoom
                            title="Choose your room"
                            handleSearch={handleSearch}
                            idHotel={state._id}
                            onChangeCheckIn={onChangeCheckIn}
                            onChangeCheckOut={onChangeCheckOut}
                            handleLoading={handleLoading}
                            handleCloseLoading={handleCloseLoading}
                        />
                        <div className={cx("row algin-items-center")}>
                            {loading ? <Loading /> : dataRooms.length > 0 ? dataRooms.map((item) => (
                                <RoomCard
                                    key={item?.id}
                                    data={item}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                />
                            )) : <Empty />}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
function Empty() {
    return (
        <div className={cx("shop_empty")}>
            <img src={SearchEmpty} alt="" />
            <h2>There is no room you are looking for 🕵️</h2>
        </div>
    );
}

export default Detail;
