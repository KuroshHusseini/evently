import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Alert } from "react-native";

export const updateUserInfo = async (id, userObj) => {
  try {
    await firebase.firestore().collection("users").doc(id).update(userObj);
    console.log("user updated!");
  } catch (error) {
    Alert.alert("Error", "User does not exist");
  }
};

export const deleteUser = async (id) => {
  try {
    await firebase.auth().currentUser.delete();
    await firebase.firestore().collection("users").doc(id).delete();
    console.log("User deleted!");
  } catch (error) {
    console.log(error)
  }
};
