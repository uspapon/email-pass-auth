// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDERWiU4rRNvTdJNJyDW5nru4Z4MvDC6T4",
  authDomain: "email-password-auth-386a0.firebaseapp.com",
  projectId: "email-password-auth-386a0",
  storageBucket: "email-password-auth-386a0.appspot.com",
  messagingSenderId: "360588294251",
  appId: "1:360588294251:web:772e30082c1755bacc992e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;