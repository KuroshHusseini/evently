import React, { useState, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Alert } from "react-native";

import {
  loginRequest,
  registerRequest,
} from "../services/authenticationService";

export const AuthenticationContext = createContext();

// eslint-disable-next-line no-unused-vars
const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    try {
      loginRequest(email, password);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const onRegister = (firstName, lastName, number, email, password) => {
    setIsLoading(true);

    try {
      registerRequest(email, password, firstName, lastName, number);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };

  const onLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
