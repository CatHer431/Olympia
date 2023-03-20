import firebase from "firebase/compat/app";
import "firebase/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBOhXdmmHy-m7px_I5Ff8nhGQG2GANg2Xk",
    authDomain: "food-app-de12b.firebaseapp.com",
    projectId: "food-app-de12b",
    storageBucket: "food-app-de12b.appspot.com",
    messagingSenderId: "563043061209",
    appId: "1:563043061209:web:9def2f5bfbd6e0e3691dc8",
    measurementId: "G-9XJ86R1XGD"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const ggProvider = new GoogleAuthProvider();

export { auth, db, ggProvider };
