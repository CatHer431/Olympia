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
import request from "utils/request";
import dayjs from "dayjs";

import {
    DatePicker, Form, InputNumber, Button, Input
} from "antd";

import classes from "./Search.module.scss";

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

function Search(props) {
    const onChange = (value) => {
        console.log("changed", value);
    };
    const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
    const searchHotel = async (params) => {
        props.handleLoading();
        const response = await request.get("search/hotel", { params });
        props.handleCloseLoading();
        props.handleSearch(response.data.result);
    };

    const onFinish = (values) => {
        const param = {
            start_date: formatDate(values.date[0]),
            end_date: formatDate(values.date[1]),
            city: values.place,
            max_person: values.travellers ? values.travellers : 1
        };
        console.log("Success:", param);
        searchHotel(param);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className={cx("container__search")}>
            <h2>Where to?</h2>
            <div className={cx("container__search-content")}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
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
                        label="Going to"
                        name="place"
                        rules={[
                            {
                                message: "Please input your place!"
                            }
                        ]}
                        style={{ width: "30%" }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Dates"
                        {...rangeConfig}
                        style={{ width: "30%" }}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label="Travellers"
                        style={{ width: "9%" }}
                        name="travellers"
                    >
                        <InputNumber
                            min={1}
                            max={100}
                            defaultValue={1}
                            onChange={onChange}
                            formatter={(value) => `${value} travellers`}
                            parser={(value) => value.replace("travellers", "")}
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

export default Search;
