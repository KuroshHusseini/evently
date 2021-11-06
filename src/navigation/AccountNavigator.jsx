import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//* screens
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "./../screens/LoginScreen";
import { theme } from "./../theme/index";

const Stack = createStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        title: "Login",
        headerStyle: {
          backgroundColor: theme.colors.main.secondary,
        },
        headerTintColor: theme.colors.main.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        title: "Register",
        headerStyle: {
          backgroundColor: theme.colors.main.secondary,
        },
        headerTintColor: theme.colors.main.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
