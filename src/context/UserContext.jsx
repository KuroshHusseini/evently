import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { Alert } from "react-native";
import { deleteUser, updateUserInfo } from "../services/userServices";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const UserContext = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    };
  },
});
// eslint-disable-next-line no-unused-vars
const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const registerForPushNotification = async (userID) => {
    try {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalState = status;
      if (status !== "granted") {
        const { status } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        finalState = status;
      }

      if (finalState !== "granted") {
        Alert.alert(
          "Permission not granted! you will not receive any push notifications"
        );
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();
      await firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .update({
          ...userInfo,
          expoPushToken: token.data,
        });

      const backgroundSubscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      const foregroundSubscription =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification);
        });

      return () => {
        backgroundSubscription.remove();
        foregroundSubscription.remove();
      };
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 24 ~ error", error);
    }
  };

  // useEffect(() => {}, []);

  const getUser = async (userId) => {
    useEffect(() => {
      const subscriber = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot((documentSnapshot) => {
          setUserInfo(documentSnapshot.data());
          registerForPushNotification(userId);
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
