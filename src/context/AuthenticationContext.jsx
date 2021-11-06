import React, { useState, createContext } from "react";
import { loginRequest } from "../services/authenticationService";

export const AuthenticationContext = createContext();

// eslint-disable-next-line no-unused-vars
const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(true);
        setError(e.toString());
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated: user, user, isLoading, error, onLogin }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
