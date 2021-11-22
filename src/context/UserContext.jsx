import React, { useState, createContext } from "react";

import { Alert } from "react-native";
import { deleteUser, updateUserInfo } from "../services/userServices";

export const UserContext = createContext();

// eslint-disable-next-line no-unused-vars
const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

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
        onUserUpdate,
        onDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
