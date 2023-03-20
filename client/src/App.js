import React, { Suspense } from "react";

import { db } from "config/config";

import { useDispatch } from "react-redux";
import { addToCart } from "apps/actions/cartAction";

import { useAuthenticated, useTryCatchWrapper } from "hooks";

import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

const Loading = React.lazy(() => import("./components/Loading"));
const Hotel = React.lazy(() => import("./screens/Hotel"));
const Detail = React.lazy(() => import("./screens/Detail"));
const SingUp = React.lazy(() => import("./screens/SingUp"));
const NotFund = React.lazy(() => import("./screens/NotFound"));
const SingIn = React.lazy(() => import("./screens/SingIn"));
const Booking = React.lazy(() => import("./screens/Booking"));

function App() {
    const { userDetail } = useAuthenticated();
    const dispatch = useDispatch();
    useTryCatchWrapper();
    const getCart = useTryCatchWrapper(async () => {
        db.collection("carts")
            .doc(userDetail?.uid)
            .onSnapshot((doc) => {
                if (doc.data()) {
                    const action = addToCart(doc.data().cart);
                    dispatch(action);
                }
            });
    });
    React.useEffect(() => {
        if (userDetail) {
            getCart();
        }
    }, [getCart, userDetail]);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Hotel />} />
                    <Route path="/hotel/:id" element={<Detail />} />
                    <Route path="/booking/:id" element={<Booking />} />
                    <Route path="/login" element={<SingIn />} />
                    <Route path="/register" element={<SingUp />} />
                    <Route path="*" element={<NotFund />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </>
    );
}

export default App;
