// Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXq6muaGUMnY71-Gs8FjFTM35ZNv_zJm0",
  authDomain: "blog-web-c757e.firebaseapp.com",
  projectId: "blog-web-c757e",
  storageBucket: "blog-web-c757e.appspot.com",
  messagingSenderId: "575023728478",
  appId: "1:575023728478:web:71bbcb9b4bce3adac5b1cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}

// console.log('Firebase Initialize:-',app);
