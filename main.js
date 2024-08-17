import { auth } from "./firebase.mjs";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Sign up
let emailSign = document.getElementById("emailSign");
let passwordSign = document.getElementById("passwordSign");
let signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Check if email and password are not empty
  if (emailSign.value !== '' && passwordSign.value !== '') {
    createUserWithEmailAndPassword(auth, emailSign.value, passwordSign.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;    
        alert('Sign-Up Successful!');

        // Clear input fields
        emailSign.value = '';
        passwordSign.value = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  } else {
    alert('Please enter email and password');
  }
});

 // Login
  let emailLogin = document.getElementById("emailLogin");
  let passwordLogin = document.getElementById("passwordLogin");
  let loginForm = document.getElementById("loginForm");

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Check if email and password are not empty
    if (emailLogin.value !== '' && passwordLogin.value !== '') {
      signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
        .then((userCredential) => {
          // Logged in 
          const user = userCredential.user;
          alert('Login Successful!');

          // Clear input fields
          emailLogin.value = '';
          passwordLogin.value = '';
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Please enter email and password');
    }
  });

  


