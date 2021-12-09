import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Alert } from "react-native";
import { deleteUser, updateUserInfo } from "../services/userServices";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const getUser = (userId) => {
    useEffect(() => {
      const subscriber = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          setUserInfo(documentSnapshot.data());
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [userId]);
  };

  const onUserUpdate = (userId, userObj) => {
    setIsLoading(true);
    try {
      updateUserInfo(userId, userObj);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };

  

  const onDeleteUser = (id) => deleteUser(id);

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
