/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable object-curly-newline */
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
// import { animateScroll } from "react-scroll";
import { Link } from "react-scroll";

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
    const [isFilterPetClicked, setIsFilterPetClicked] = useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [productPerPage] = React.useState(8);

    const ref = React.useRef();
    // const handleExplore = () => {
    //     animateScroll.scrollTo("#explore-id", {
    //         duration: 500,
    //         delay: 100,
    //         smooth: true
    //         // offset: -70
    //     });
    // };
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

    const filterHandleChange = () => {
        setIsFilterPetClicked(true);
        const filteredData = data.filter((item) => {
            if (item.isPetAllowed) {
                return item;
            }
        });
        setData(filteredData);
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
        <Layout scrollHeight={(window.innerHeight) * 0.6}>
            <section className={cx("shop")}>
                {/* <div className={cx("shop-area")}> */}
                <div>
                    <div className={cx("shop-area")}>
                        <div className={cx("shop-area__title")}>
                            <h2>Plan your</h2>
                            <h2> next getaway</h2>
                            <div>Make your hotel feel like home</div>
                            <button><Link to="explore" spy={true}> Explore Now</Link></button>
                        </div>
                        <div className={cx("search")}>
                        </div>
                        <div className={cx("dark-overlay")}></div>
                        <video src={Video} autoPlay loop muted preload="auto" />
                    </div>
                </div>
                <div className={cx("shop-content")} style={{ position: "relative", top: "-135px" }}>
                    <div className={cx("container")}>
                        <div className={cx("shop-content__top")}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", width: "80%", borderRadius: "10px", height: "150px" }}>
                                    <div style={{ flex: "1" }}>
                                        <Search handleSearch={handleSearch} handleLoading={handleLoading} handleCloseLoading={handleCloseLoading} />
                                    </div>
                                </div>
                            </div>
                            {/* <div id="explore">
                                <img src="https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1166654799-scaled.jpg?fit=700,468" />
                            </div> */}
                            <div className={cx("right")} style={{ marginTop: "120px" }}>
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
                                <div className={cx("filter")}>
                                    <div>Show</div>
                                    <div className={cx("petFilter")}>
                                        <button className={!isFilterPetClicked ? cx("defaultPetClick") : cx("activePetClick")} onClick={filterHandleChange}>Pet allowed</button>
                                        {/* <button isFilterPetClicked ? className={cx("defaultPetClick")} : cla className={isFilterPetClicked ? {cx("defaultPetClick")} : {cx("activePetClick")}} onClick={filterHandleChange}>Pet allowed</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("shop-list")} id="hotelList">
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
