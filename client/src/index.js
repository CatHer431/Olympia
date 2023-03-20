import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { Provider } from "react-redux";
import store from "apps/store";
import "./assets/styles/global.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
