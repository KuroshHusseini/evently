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
      maintainer: false,
    });
    console.log("User Created");
    return currentUser;
  } catch (error) {
    Alert.alert(
      "Authentication Error",
      "User with the same corresponding email already exists"
    );
  }
};

export const changePasswordRequest = async (currentPass) => {
  const currentUserEmail = await firebase.auth().currentUser.email;
  try {
    const emailCred = await firebase.auth.EmailAuthProvider.credential(
      currentUserEmail,
      currentPass
    );

    const userReAuthenticate = await firebase
      .auth()
      .currentUser.reauthenticateWithCredential(emailCred);

    if (userReAuthenticate) {
      Alert.prompt(
        "New password",
        "Please enter your new password.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Enter",
            onPress: (newPass) => {
              if (
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                  newPass
                )
              ) {
                Alert.prompt(
                  "Confirm password",
                  "Please repeat your new password.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Enter",
                      onPress: (confirmPassword) => {
                        if (confirmPassword === newPass) {
                          firebase.auth().currentUser.updatePassword(newPass);
                          Alert.alert("Password changed!");
                        } else {
                          Alert.alert(
                            "Password does not match please try again later"
                          );
                        }
                      },
                    },
                  ],
                  "secure-text",
                  null,
                  "dark"
                );
              } else {
                Alert.alert(
                  "Error",
                  "Passwords must match and contain a minimum length of 8 characters with the following format upper case, lower case, number, special character."
                );
              }
            },
          },
        ],
        "secure-text",
        null,
        "dark"
      );
    }
  } catch (error) {
    Alert.alert("Wrong password", "Please try again later!");
  }
};
