import React, { useState, createContext } from "react";
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

  
  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const loginUser = await loginRequest(email, password);
      setUser(loginUser.user);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const onRegister = async (firstName, lastName, number, email, password) => {
    setIsLoading(true);
    try {
      const registeredUser = await registerRequest(
        email,
        password,
        firstName,
        lastName,
        number
      );
      setUser(registeredUser);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signOut();
      setUser(null);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
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
