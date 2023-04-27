import { auth, db, ggProvider } from "config/config";
// import { LOCAL_STORAGE } from "constants/global";
import { useNavigate } from "react-router-dom";
import React from "react";
import { TOAST_TYPE } from "constants/global";
import useHandleCart from "./useHandleCart";
import useToast from "./useToast";
// import useLocalStorge from "./useLocalStorge";

function useAuthenticated() {
    const [userDetail, setUserDetail] = React.useState(null);
    const navigate = useNavigate();

    const { addToFireStore } = useHandleCart();

    const toast = useToast();
    const googleSingIn = () => {
        auth.signInWithPopup(ggProvider).then((result) => {
            if (result) {
                toast("Login Successfully", () => { navigate("/"); });
            }
        });
    };

    const singUpEmailPassword = (data) => {
        auth.createUserWithEmailAndPassword(data.email, data.password).then((credentials) => {
            db.collection("users").doc(credentials.user.uid).set(data).then(() => {
                toast("Register Successfully", () => { navigate("/login"); });
            })
                .catch((error) => toast(error.message, null, TOAST_TYPE.ERROR));
        }).catch((error) => {
            toast(error.message, null, TOAST_TYPE.ERROR);
        });
    };
    const singInEmailPassword = (data) => {
        console.log("singInEmailPassword");
        auth.signInWithEmailAndPassword(data?.email, data?.password).then(() => {
            toast("Login Successfully", () => { navigate("/"); });
        }).catch((error) => toast(error?.message, null, TOAST_TYPE.ERROR));
    };

    const logOut = () => {
        auth.signOut().then(() => {
            setUserDetail(false);
        });
    };

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                const {
                    displayName, email, uid, photoURL
                } = currentUser;
                console.log("displayName: ", displayName);
                if (displayName) {
                    setUserDetail({
                        displayName, email, uid, photoURL
                    });
                } else {
                    db.collection("users").doc(uid).get()
                        .then((snapdoc) => {
                            const { lastname, firstname } = snapdoc.data();
                            setUserDetail({ lastname, firstname, uid });
                        });
                }
                addToFireStore(uid);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return {
        googleSingIn,
        logOut,
        userDetail,
        setUserDetail,
        singUpEmailPassword,
        singInEmailPassword
    };
}

export default useAuthenticated;
