/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import classNames from "classnames/bind";
// import { db } from "config/config";
// import { useDispatch } from "react-redux";
import {
    DatePicker, Form, InputNumber, Button
} from "antd";
import request from "utils/request";
import dayjs from "dayjs";

import classes from "./SearchRoom.module.scss";

const { RangePicker } = DatePicker;

const rangeConfig = {
    rules: [
        {
            type: "array",
            required: true,
            message: "Please select time!"
        }
    ]
};
const cx = classNames.bind(classes);

function SearchRoom(props) {
    const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
    const searchHotel = async (params) => {
        props.handleLoading();
        const response = await request.get(`search/hotel/${props.idHotel}`, { params });
        props.handleCloseLoading();
        props.handleSearch(response.data.result.length > 0 ? response.data.result[0].rooms : []);
    };

    const onFinish = (values) => {
        const param = {
            start_date: formatDate(values.date[0]),
            end_date: formatDate(values.date[1]),
            max_person: values.travellers ? values.travellers : 1
        };
        props.onChangeCheckIn(param.start_date);
        props.onChangeCheckOut(param.end_date);
        searchHotel(param);
    };
    const onChange = (value) => {
        console.log("changed", value);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className={cx("container__search")}>
            <h2>{props.title}</h2>
            <div className={cx("container__search-content")}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 20
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    style={{
                        width: "100%",
                        display: "flex"
                    }}
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="date"
                        label="Dates"
                        {...rangeConfig}
                        style={{ width: "30%" }}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label="Travelers"
                        name="travellers"
                        style={{ width: "14%" }}
                    >
                        <InputNumber
                            style={{ width: "120px", color: "red" }}
                            min={1}
                            max={100}
                            defaultValue={1}
                            onChange={onChange}
                            formatter={(value) => `${value} travellers`}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                        style={{ width: "20%" }}
                        label=" "
                    >
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default SearchRoom;
