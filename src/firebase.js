// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_PBDm8EPdMqiBDXox9EIqkvV1OhFwaOQ",
  authDomain: "senior-project-5475e.firebaseapp.com",
  projectId: "senior-project-5475e",
  storageBucket: "senior-project-5475e.appspot.com",
  messagingSenderId: "919193839123",
  appId: "1:919193839123:web:7996a7852cfa08ba8e01e6",
  measurementId: "G-ZGN4LHJDQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;