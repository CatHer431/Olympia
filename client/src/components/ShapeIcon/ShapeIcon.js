import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import classes from "./ShpaeIcon.module.scss";

const cx = classNames.bind(classes);

function ShapeIcon(props) {
    const {
        classname,
        img,
        top,
        left,
        right,
        bottom
    } = props;
    return (
        <div
            className={cx(`${classname}`)}
            style={{
                top: `${top}`,
                right: `${right}`,
                bottom: `${bottom}`,
                left: `${left}`
            }}
        >
            <img src={img} alt="" />
        </div>
    );
}

ShapeIcon.propTypes = {
    img: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    classname: PropTypes.string
};

ShapeIcon.defaultProps = {
    img: "",
    top: "",
    left: "",
    right: "",
    bottom: "",
    classname: ""
};
export default ShapeIcon;
