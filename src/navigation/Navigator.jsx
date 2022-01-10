/* eslint-disable react/no-children-prop */
import React, { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { NavigationContainer } from "@react-navigation/native";
import AccountNavigator from "./AccountNavigator";
import EventNavigator from "./EventNavigator";

const Navigator = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
 
  return (
    <NavigationContainer>
      {isAuthenticated ? <EventNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
