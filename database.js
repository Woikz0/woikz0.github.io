

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb4E544iSdkFkBPmO4AzOw7g3M0aoVPL4",
    authDomain: "wokz0-io.firebaseapp.com",
    projectId: "wokz0-io",
    storageBucket: "wokz0-io.appspot.com",
    messagingSenderId: "351986070822",
    appId: "1:351986070822:web:3420046d902fc0bb17bde7",
    measurementId: "G-6WRD2N329J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import { getDatabase, ref, set, child, update, remove, get, push}
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const db = getDatabase();

export default {db, set, ref, get, child, push};