import React, { useState, createContext } from "react";
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

  const getUser = async (userId) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then((ds) => {
          if (ds.exists) {            
            setUserInfo( ds.data());
          }
        });
    } catch (error) {
      console.log(
        "🚀 ~ file: UserContext.jsx ~ line 29 ~ getUser ~ error",
        error
      );
    }
  };

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
        getUser,
        onUserUpdate,
        onDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
