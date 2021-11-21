import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Alert } from "react-native";
import { deleteUser, updateUserInfo } from "../services/userServices";

export const UserContext = createContext();

// eslint-disable-next-line no-unused-vars
const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(
    () => async () => {
      try {
        const currentUser = await firebase.auth().currentUser;
        const user = await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get();
        setUserInfo(user.data());
      } catch (error) {
        Alert.alert("Error", "No user data found!");
      }
    },
    []
  );

  const onUserUpdate = (key, userObj) => {
    setIsLoading(true);
    try {
      updateUserInfo(key, userObj);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };

  const onDeleteUser = () => deleteUser();

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userInfo,
        onUserUpdate,
        onDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
