// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqN6LxWwRhk7vysXC2DYkKECDXQIS3-WA",
    authDomain: "dotes-blog.firebaseapp.com",
    projectId: "dotes-blog",
    storageBucket: "dotes-blog.appspot.com",
    messagingSenderId: "14207246524",
    appId: "1:14207246524:web:92e7aff7f675989fe330b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db};

// console.log('Firebase Initialize:-',app);
// console.log('Firebase Initialize:-',db);
