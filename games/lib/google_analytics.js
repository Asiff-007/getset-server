import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgEpR_BExdEkXN-hQZKC2LSsh9qIbB29w",
    authDomain: "getset-for-shops.firebaseapp.com",
    projectId: "getset-for-shops",
    storageBucket: "getset-for-shops.appspot.com",
    messagingSenderId: "733025079803",
    appId: "1:733025079803:web:fc76e53ef4d25971f4fb5e",
    measurementId: "G-MMMQEK1JEC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export {logEvent, analytics};