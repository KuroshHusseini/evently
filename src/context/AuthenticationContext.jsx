import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Alert } from "react-native";

import {
  changePasswordRequest,
  loginRequest,
  registerRequest,
} from "../services/authenticationService";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = firebase
      .auth()
      .onAuthStateChanged(async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      });
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);
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
      setIsLoading(false)
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

  const onChangePassword = (password) => {
    changePasswordRequest(password);
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
        onChangePassword,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
