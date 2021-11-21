import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Alert } from "react-native";

export const loginRequest = async (email, password) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return response;
  } catch (error) {
    Alert.alert("Authentication Error", "Wrong email or password!");
  }
};

export const registerRequest = async (
  rEmail,
  rPassword,
  firstName,
  lastName,
  number
) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(rEmail, rPassword);
    const currentUser = firebase.auth().currentUser;

    await firebase.firestore().collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
      phoneNumber: number,
    });
    console.log("User Created");
  } catch (error) {
    Alert.alert(
      "Authentication Error",
      "User with the same corresponding email already exists"
    );
  }
};

export const userInfoRequest = async (id) => {
  const user = await firebase.firestore().collection("users").doc(id).get();
  if (!user.exists) {
    Alert.alert("No user data found!");
  } else {
    return user.data();
  }
};
