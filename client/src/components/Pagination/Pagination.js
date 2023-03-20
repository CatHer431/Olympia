import React from "react";

import classNames from "classnames/bind";

import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.scss";

const cx = classNames.bind(classes);

function Pagination({ length, paginate }) {
    const pages = Math.ceil(length / 16);
    const pageChange = (page) => {
        const { selected } = page;
        paginate(selected + 1);
        window.scrollTo(0, 50);
    };
    return (
        <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={pages}
            pageRangeDisplayed={3}
            onPageChange={pageChange}
            marginPagesDisplayed={1}
            containerClassName={cx("pagination-list")}
            activeClassName={cx("selected")}
            activeLinkClassName={cx("selected")}
        />
    );
}

export default Pagination;
