import { db, auth } from "./firebase.mjs";
import {
  collection, collectionGroup,
  addDoc, onSnapshot, deleteDoc, doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


let addPost = document.getElementById("addpostbtn");
let postheadInput = document.getElementById("posthead");
let postdisInput = document.getElementById("postdis");
let showblog = document.getElementById("displayblog");
let showblogHome = document.getElementById("displayblogHome");
let userEmail = document.getElementById("userEmail");

// Ensure user is authenticated
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User ID: ", user.email);
    if (userEmail) {
      userEmail.innerHTML = user.email;
    }


    // Attach event listener to add post button
    if (addPost) {
      addPost.addEventListener('click', function (event) {
        event.preventDefault();
        addNewUserPost(user.uid, user.email);  // Pass the user ID
      });
    }

    // Fetch and display only the user's posts
    fetchAndDisplayUserPosts(user.uid);

    // Fetch and display all posts in the home section
  } else {
    console.log("No user is signed in.");
  }
});


fetchAndDisplayAllPosts();


// Function to add a new post to the user's collection
async function addNewUserPost(userId, userEmail) {
  try {
    const userPostsCollection = collection(db, `users/${userId}/posts`);
    const docRef = await addDoc(userPostsCollection, {
      posthead: postheadInput.value,
      postdis: postdisInput.value,
      postTime: new Date(),
      posterEmail: userEmail
    });

    postheadInput.value = "";
    postdisInput.value = "";

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to fetch and display posts for a specific user
function fetchAndDisplayUserPosts(userId) {
  const userPostsCollection = collection(db, `users/${userId}/posts`);

  onSnapshot(userPostsCollection, (snapshot) => {
    if (showblog) {
      showblog.innerHTML = '';
    }

    snapshot.forEach((docSnapshot) => {
      let blogPost = docSnapshot.data();
      let postElement = document.createElement('div');
      postElement.classList.add('blog-card');
      postElement.innerHTML = `  
        <h1 class="blog-title">${blogPost.posthead}</h1>
        <p class="blog-overview">${blogPost.postdis}</p>
        <button class="deletebtn">Delete</button>
        <button class="editbtn">Edit</button>
      `;

      // Adding Event Listeners for Delete and Edit buttons
      postElement.querySelector('.deletebtn').addEventListener('click', async () => {
        try {
          await deleteDoc(doc(db, `users/${userId}/posts`, docSnapshot.id));
          console.log("Document deleted with ID: ", docSnapshot.id);
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      });

      // TODO: Add functionality for editing the blog post here

      if (showblog) {
        showblog.appendChild(postElement);
      }
    });
  });
}

// Function to fetch and display all posts from all users
function fetchAndDisplayAllPosts() {
  const allPostsQuery = collectionGroup(db, 'posts');  // Use collectionGroup to get posts from all users
  // const allUsersEmails = collectionGroup(db, 'users');

  // console.log("All Users : ", allUsersEmails);

  onSnapshot(allPostsQuery, (snapshot) => {
    if (showblogHome) {
      showblogHome.innerHTML = '';
    }

    snapshot.forEach((doc) => {
      let blogPost = doc.data();
      let postElementHome = document.createElement('div');
      postElementHome.classList.add('blog-card');
      postElementHome.innerHTML = `  
        <h1 class="blog-title">${blogPost.posthead}</h1>
        <p class="blog-overview">${blogPost.postdis}</p>
        <p class="blog-overview">Posted by : ${blogPost.posterEmail}</p>
      `;

      if (showblogHome) {
        showblogHome.appendChild(postElementHome);
      }
    });
  });

  // onSnapshot(allUsersEmails, (snapshot) => {
  //   console.log("All Users : ", snapshot);
  //   snapshot.forEach((doc) => {
  //     console.log("User Email : ", doc.data().email);
  //   });
  // });




}

