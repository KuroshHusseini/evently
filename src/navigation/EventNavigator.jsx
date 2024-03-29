import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import CreatedNavigator from "./CreatedNavigator";
import ProfileNavigator from "./ProfileNavigator";
import EventValidationNavigator from "./EventValidationNavigator";

import { theme } from "./../theme/index";
import { UserContext } from "./../context/UserContext";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    switch (route.name) {
      case "HomeScreen":
        return (
          <Ionicons
            name="ios-home"
            size={24}
            color={focused ? theme.colors.main.primary : theme.colors.main.grey}
          />
        );

      case "CartScreen":
        return (
          <Ionicons
            name="ios-cart"
            size={24}
            color={focused ? theme.colors.main.primary : theme.colors.main.grey}
          />
        );

      case "CreatedScreen":
        return (
          <FontAwesome
            name="history"
            size={24}
            color={focused ? theme.colors.main.primary : theme.colors.main.grey}
          />
        );
      case "EventValidationScreen":
        return (
          <MaterialCommunityIcons
            name="eye-check"
            size={24}
            color={focused ? theme.colors.main.primary : theme.colors.main.grey}
          />
        );

      case "ProfileScreen":
        return (
          <FontAwesome
            name="user"
            size={24}
            color={focused ? theme.colors.main.primary : theme.colors.main.grey}
          />
        );
    }
  },
  tabBarActiveBackgroundColor: theme.colors.main.secondary,
  tabBarInactiveBackgroundColor: theme.colors.main.secondary,
  tabBarActiveTintColor: theme.colors.main.primary,
  tabBarInactiveTintColor: theme.colors.main.grey,
});

const EventNavigator = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarActiveTintColor="black">
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      {userInfo && userInfo.maintainer ? (
        <Tab.Screen
          name="EventValidationScreen"
          options={{ title: "Validate", headerShown: false }}
          component={EventValidationNavigator}
        />
      ) : (
        <>
          <Tab.Screen
            name="CartScreen"
            options={{ title: "Cart", headerShown: false }}
            component={CartNavigator}
          />
          <Tab.Screen
            name="CreatedScreen"
            options={{ title: "Created", headerShown: false }}
            component={CreatedNavigator}
          />
        </>
      )}

      <Tab.Screen
        name="ProfileScreen"
        options={{ title: "Profile", headerShown: false }}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default EventNavigator;
