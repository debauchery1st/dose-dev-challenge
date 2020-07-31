import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyAAp0QeIZs9PGMzOmpY20j0XqyvYMZf_Jk",
  authDomain: "dose-dev-challenge.firebaseapp.com",
  databaseURL: "https://dose-dev-challenge.firebaseio.com",
  projectId: "dose-dev-challenge",
  storageBucket: "dose-dev-challenge.appspot.com",
  messagingSenderId: "906536118969",
  appId: "1:906536118969:web:0c657dba508c90e0da4968",
  measurementId: "G-TPHFTXDT32"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
firebaseApp.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const ratingsCollection = db.collection("ratings");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  ratingsCollection,
  firebaseApp
};
