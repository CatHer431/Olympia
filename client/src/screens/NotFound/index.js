import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function NotFound() {
    return (
        <div className="not-found__container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-xs-12 col-md-12">
                        <div className="d-flex align-items-center flex-column">
                            <h1 className="text-center">404</h1>
                            <div className="not-found__background" />

                            <div className="not-found__content">
                                <h3>Look like you&apos;re lost</h3>
                                <p>the page you are looking for not available!</p>
                                <Link to="/" className="not-found__link">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
