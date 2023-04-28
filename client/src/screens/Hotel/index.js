/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import Layout from "components/Layout";
import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import request from "utils/request";
import { Paginaion } from "components";

import SearchEmpty from "assets/images/no_search.svg";

import Search from "components/Search/Search";
import HotelCard from "components/HotelCard/HotelCard";
import Loading from "components/Loading";
import Video from "assets/banner.mp4";
import clasess from "./Shop.module.scss";

const cx = classNames.bind(clasess);

const Types = [
    {
        name: "Price: Low to High",
        type: "PRICE_LOW_TO_HIGH"
    },
    {
        name: "Price: High to Low",
        type: "PRICE_HIGH_TO_LOW"
    },
    {
        name: "Rating: Low to High",
        type: "RATING_LOW_TO_HIGH"
    },
    {
        name: "Rating: High to Low",
        type: "RATING_HIGH_TO_LOW"
    }

];

function Hotel() {
    const [search] = React.useState("");
    const [data, setData] = useState([]);
    const [nameSort, setNameSort] = React.useState("");
    const [showDrop, setShowDrop] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [productPerPage] = React.useState(8);

    const ref = React.useRef();
    // onclick outside
    const getData = async () => {
        const response = await request.get("hotels");
        setData(response.data.result);
    };
    const handleLoading = () => {
        setLoading(true);
    };
    const handleCloseLoading = () => {
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);

    const handleOutSide = (e) => {
        if (ref.current && ref.current.contains(e.target)) {
            setShowDrop((pre) => !pre);
        } else {
            setShowDrop(false);
        }
    };
    React.useEffect(() => {
        window.addEventListener("click", handleOutSide, true);
        return () => {
            window.removeEventListener("click", handleOutSide, true);
        };
    }, []);
    // sort
    const shortHandleChange = (type, name) => {
        setNameSort(name);
        if (type === "PRICE_LOW_TO_HIGH") {
            data.sort((a, b) => a.min_price.currentPrice - b.min_price.currentPrice);
        }
        if (type === "PRICE_HIGH_TO_LOW") {
            data.sort((a, b) => b.min_price.currentPrice - a.min_price.currentPrice);
        }
        if (type === "RATING_LOW_TO_HIGH") {
            data.sort((a, b) => a.rating - b.rating);
        }
        if (type === "RATING_HIGH_TO_LOW") {
            data.sort((a, b) => b.rating - a.rating);
        }
        // const action = sort(type);
        // dispatch(action);
    };

    const handleSearch = (item) => {
        setData(item);
    };
    // pagination

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = data
        .filter((item) => {
            if (search === "") {
                return item;
            }
            if (item?.name?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        .slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <section className={cx("shop")}>
                {/* <div className={cx("shop-area")}> */}
                <div>
                    <div className={cx("shop-area")}>
                        <div className={cx("shop-area__title")}>
                            <h2>Hotels</h2>
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
                            </ul>
                        </div>
                        <div className={cx("dark-overlay")}></div>
                        <video src={Video} autoPlay loop muted preload="auto" />
                    </div>
                </div>
                <div className={cx("shop-content")}>
                    <div className={cx("container")}>
                        <div className={cx("shop-content__top")}>
                            <Search handleSearch={handleSearch} handleLoading={handleLoading} handleCloseLoading={handleCloseLoading} />
                            <div className={cx("right")}>
                                <div className={cx("sort")}>
                                    <div ref={ref} className={cx("sort__select")}>
                                        <span>{nameSort || "Default Sorting"}</span>
                                        <i className={cx("bx bx-chevron-down")} />
                                    </div>
                                    <ul className={cx("sort__list", { "is-active": showDrop })}>
                                        {
                                            Types.map(({ name, type }, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        shortHandleChange(type, name);
                                                    }}
                                                >
                                                    {name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={cx("shop-list")}>
                            {loading ? <Loading />
                                : data.length > 0
                                    ? (
                                        <>
                                            <div className={cx("row algin-items-center")}>
                                                {data
                                                    .map((item) => (
                                                        <HotelCard
                                                            key={item?.id}
                                                            data={item}
                                                        />
                                                    ))}
                                            </div>
                                            <Paginaion
                                                length={search ? currentProduct?.length : data?.length}
                                                paginate={paginate}
                                            />

                                        </>
                                    )
                                    : <Empty />}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

const Empty = () => (
    <div className={cx("shop_empty")}>
        <img src={SearchEmpty} alt="" />
        <h2>There is no hotel you are looking for 🕵️</h2>
    </div>
);

export default Hotel;
