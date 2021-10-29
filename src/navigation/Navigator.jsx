/* eslint-disable react/no-children-prop */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//* screens
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import CreatedNavigator from "./CreatedNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={HomeNavigator}
          options={{
            headerShown: false,
        
          }}
        />
        <Tab.Screen
          name="CartScreen"
          options={{ headerShown: false }}
          component={CartNavigator}
        />
        <Tab.Screen
          name="CreatedScreen"
          options={{ headerShown: false }}
          component={CreatedNavigator}
        />
        <Tab.Screen
          name="ProfileScreen"
          options={{ headerShown: false }}
          component={ProfileNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
