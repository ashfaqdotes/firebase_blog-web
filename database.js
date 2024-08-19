import { db, auth } from "./firebase.mjs";
import {
  collection, collectionGroup,
  addDoc, onSnapshot, deleteDoc, doc, setDoc
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
      userEmail.innerHTML = `<b>User Email</b>: ${user.email}`;
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
      posterEmail: userEmail,

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
      // postElement.innerHTML = `  
      //   <h1 class="blog-title">${blogPost.posthead}</h1>
      //   <p class="blog-overview">${blogPost.postdis}</p>
      //   <button class="deletebtn">Delete</button>
      //   <button class="editbtn">Edit</button>
      // `;
      postElement.innerHTML = `  
      <div class="col">
        <div class="card">
          <div class="card-body">
          <h5 class="card-title">${blogPost.posthead}</h5>
          <p class="card-text" style="height: 5rem;">${blogPost.postdis}</p>
          </div>
          <div class="card-footer">
          <button type="button" class="deletebtn btn btn-danger">Delete</button>
          <button type="button" class="editbtn btn btn-secondary">Edit</button>
          </div>
      </div>
    </div>
      `;

      // Adding Event Listeners for Delete and Edit buttons
      // For Delete
      postElement.querySelector('.deletebtn').addEventListener('click', async () => {
        try {
          await deleteDoc(doc(db, `users/${userId}/posts`, docSnapshot.id));
          console.log("Document deleted with ID: ", docSnapshot.id);
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      });

      // For Edit
      postElement.querySelector('.editbtn').addEventListener('click', async () => {
        // TODO: Add functionality for editing the blog post

        console.log("Edit button clicked!");
        // console.log("Editing post: ", docSnapshot.data());
        const postData = docSnapshot.data();
        console.log("Post Data: ", postData);

        postData.posthead = prompt("Enter new post Title: ", postData.posthead);
        postData.postdis = prompt("Enter new post description: ", postData.postdis);
        try {
          await setDoc(doc(db, `users/${userId}/posts`, docSnapshot.id), postData);
          console.log("Document updated with ID: ", docSnapshot.id);
        } catch (e) {
          console.error("Error updating document: ", e);
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

    // console.log("All Posts : ", snapshot);

    // snapshot.docs.sort((a, b) => b.data().postTime - a.data().postTime);

    //Display all posts in the home section 
    snapshot.forEach((doc) => {
      let blogPost = doc.data();
      let postElementHome = document.createElement('div');
      postElementHome.classList.add('col');
      // postElementHome.innerHTML = `  
      //   <h1 class="blog-title">${blogPost.posthead}</h1>
      //   <p class="blog-overview">${blogPost.postdis}</p>
      //   <p class="blog-overview">Posted by : ${blogPost.posterEmail}</p>
      // <br>
      //   <small class="text-muted">Last updated : ${blogPost.postTime}</small>
      // `;
      const postDataDate = new Date(blogPost.postTime.seconds * 1000 + blogPost.postTime.nanoseconds / 1000000);
      postElementHome.innerHTML = `  
        <div class="card h-100">
          <img src="https://random-image-pepebigotes.vercel.app/api/random-image" class="card-img-top" alt="Random-Image" />
          <div class="card-body">
          <h5 class="card-title">${blogPost.posthead}</h5>
          <p style="height: 5rem;" class="card-text overflow-hidden">${blogPost.postdis}</p>
          </div>
        <div class="card-footer">
          <small class="text-muted"><b>Posted by </b>: <strong>${blogPost.posterEmail}</strong> at 
          ${postDataDate.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })} ${postDataDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</small>
        </div>
      </div>
      `
      if (showblogHome) {
        showblogHome.appendChild(postElementHome);
      }
    });
  });
}
// timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
