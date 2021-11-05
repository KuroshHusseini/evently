/* eslint-disable react/no-children-prop */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
//* screens
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import CreatedNavigator from "./CreatedNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { theme } from "./../theme/index";

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

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarActiveTintColor="black"
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeNavigator}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
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
        <Tab.Screen
          name="ProfileScreen"
          options={{ title: "Profile", headerShown: false }}
          component={ProfileNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
