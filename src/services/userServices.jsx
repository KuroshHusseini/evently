import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Alert } from "react-native";


export const updateUserInfo = async (id, userObj) => {
  try {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update(userObj);
    return user;
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
    console.log(
      "🚀 ~ file: userServices.jsx ~ line 30 ~ deleteUser ~ error",
      error
    );
  }
};
