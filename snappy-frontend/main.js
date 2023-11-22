import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import firebaseConfig from "./config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const imagetobecropped = document.getElementById("imagetobecropped");
const cropper = new Cropper(imagetobecropped, {
  aspectRatio: 0,
  viewMode: 0,
});

document.getElementById("cropImgBtn").addEventListener("click", function () {
  var croppedImg = cropper.getCroppedCanvas().toDataURL("image/png");
  document.getElementById("output").src = croppedImg;
});

signOutButton.style.display = "none";
message.style.display = "none";

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have signed out successfully!");
    })
    .catch((error) => {});
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    signOutButton.style.display = "block";
    message.style.display = "block";
    userName.innerHTML = user.displayName;
    userEmail.innerHTML = user.email;
  } else {
    signOutButton.style.display = "none";
    message.style.display = "none";
  }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
