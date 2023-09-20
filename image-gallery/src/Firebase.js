// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvjq2Q__lc26oqxJybIJmKeTl5yEkVmms",
    authDomain: "image-gallery-42a5b.firebaseapp.com",
    projectId: "image-gallery-42a5b",
    storageBucket: "image-gallery-42a5b.appspot.com",
    messagingSenderId: "790844610408",
    appId: "1:790844610408:web:0f1464123ab49fa69ba8dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;