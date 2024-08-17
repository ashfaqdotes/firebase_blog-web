import { app, auth } from "./firebase.mjs";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Sign up
let email = document.getElementById("InputEmailSignUp");
let password = document.getElementById("InputPasswordSignUp");
let submit = document.getElementById("submit");

submit.addEventListener('click', (e) => {
  console.log('Sign-up Submit Button Clicked');
  if (email.value != '' && password.value != '') {
    console.log('Email and Password are not empty');
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // console.log('Sign-up Successfull !');
        console.log(userCredential);
        const user = userCredential.user;      
        alert('Sign-Up Successfully !')
        email.value = ''
        password.value = ''
      })
      .catch((error) => {
        // console.log('Sign-up Unsuccessfull !');
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorCode} - ${errorMessage}`);
        alert('Sign-up unsuccessfull !')
        // ..
      });
  }

  else {
    console.log('Email and Password are empty');
    alert('Please enter email and password')
  }
  
});

// Login
let emailLogin = document.getElementById("InputEmailLogin");
let passwordLogin = document.getElementById("InputPasswordLogin");
let submitLog = document.getElementById("submitLog");

submitLog.addEventListener("click", function(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth,  emailLogin.value, passwordLogin.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Successfully Login !')
    window.location.href = "index.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorCode} - ${errorMessage}`);
  });

})

// submitLog.addEventListener('click', (e) => {
//   console.log('Login Submit Button Clicked');
//   signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
//   .then((userCredential) => {
//     // console.log('Login Successfull !');
//     console.log(userCredential);
//     const user = userCredential.user;
//     alert('Login Successfully !')
//     emailLogin.value = ''
//     passwordLogin.value = ''
//     // Dashboard
//     window.location.href = '/dashboard/dashboard.html'

//   })
    
//   .catch((error) => {
//     // console.log('Login Unsuccessfull !');
//     console.log(error);
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(`Error: ${errorCode} - ${errorMessage}`);
//   });
// })

