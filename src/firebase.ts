import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-yGIJpiwr1vHqAE5_cr1PASXbp2zXuvw",
  authDomain: "recipe-application-154cd.firebaseapp.com",
  projectId: "recipe-application-154cd",
  storageBucket: "recipe-application-154cd.appspot.com",
  messagingSenderId: "51886482124",
  appId: "1:51886482124:web:5235fb7b62916eb7a25869",
  measurementId: "G-Z2QM21DZWV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
