import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";



export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const registerRequest = (rEmail, rPassword) =>
  firebase.auth().createUserWithEmailAndPassword(rEmail, rPassword);
