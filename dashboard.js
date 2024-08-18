import { auth } from "./firebase.mjs";
import { signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Authentication Check
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    window.location.href = 'index.html'
  }
});

// Sign out
let signOutButton = document.getElementById("signOutButton");
if (signOutButton){
  signOutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert('Sign Out Successful!');
      window.location.href = "index.html";
      sessionStorage.clear();
    }).catch((error) => {
      // An error happened.
      alert('Error signing out: ' + error.message);
    });
  });
}
