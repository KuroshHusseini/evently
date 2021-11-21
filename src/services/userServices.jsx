import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Alert } from "react-native";

export const updateUserInfo = async (key, userObj) => {
  try {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(key)
      .update(userObj);
    console.log(
      "🚀 ~ file: userServices.jsx ~ line 23 ~ updateUserInfo ~ user",
      user
    );
    return user;
  } catch (error) {
    Alert.alert("Error", "User does not exist");
    console.log(
      "🚀 ~ file: authenticationService.jsx ~ line 59 ~ updateUserInfo ~ error",
      error
    );
  }
};

export const deleteUser = async () => {
  try {
    const currentUser = firebase.auth().currentUser;
    await firebase.auth().currentUser.delete();
    await firebase.firestore().collection("users").doc(currentUser.uid).delete();
    console.log("User deleted!");
  } catch (error) {
    console.log(
      "🚀 ~ file: UserContext.jsx ~ line 49 ~ onDeleteUser ~ error",
      error
    );
  }
};
