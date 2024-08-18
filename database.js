import { db } from "./firebase.mjs";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
let addPost = document.getElementById("addpostbtn");
let postheadInput = document.getElementById("posthead");
let postdisInput = document.getElementById("postdis");
let showblog = document.getElementById("displayblog");
let showblogHome = document.getElementById("displayblogHome");


console.log("Show Blog", showblogHome)

if (addPost) {
  addPost.addEventListener('click', function (event) {
    event.preventDefault();
    addNewUser();
  });
}

// Function to add a new document
async function addNewUser() {
  console.log("Working... post form")
  try {
    const docRef = await addDoc(collection(db, "blog"), {
      posthead: postheadInput.value,
      postdis: postdisInput.value,
      postTime: new Date(),

    });

    postheadInput.value = "";
    postdisInput.value = "";

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Read Data and Display Blog Posts
onSnapshot(collection(db, 'blog'), (snapshot) => {
  // showblog.innerHTML = '';
  if (showblog) { 
    showblog.innerHTML = '';
  }
  if (showblogHome) { 
    showblogHome.innerHTML = '';
  }
  snapshot.forEach((docs) => {
    let blogPost = docs.data();
    let postElement = document.createElement('div');
    let postElementHome = document.createElement('div');
    postElement.classList.add('blog-card');
    postElement.innerHTML = `  
      <h1 class="blog-title">${blogPost.posthead}</h1>
      <p class="blog-overview">${blogPost.postdis}</p>
      <button class="deletebtn">Delete</button>
      <button class="editbtn">Edit</button>
    `;
    postElementHome.classList.add('blog-card');
    postElementHome.innerHTML = `  
      <h1 class="blog-title">${blogPost.posthead}</h1>
      <p class="blog-overview">${blogPost.postdis}</p>
    `;

    // Adding Event Listeners for Delete and Edit buttons
    postElement.querySelector('.deletebtn').addEventListener('click', async () => {
      try {
        await deleteDoc(doc(db, "blog", docs.id));
        console.log("Document deleted with ID: ", docs.id);
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    });

    // TODO: Add functionality for editing the blog post here
    if (showblog) {
      showblog.appendChild(postElement);
    }

    if (showblogHome) {
      showblogHome.appendChild(postElementHome);
    }
  });
});



