/* eslint-disable react/no-children-prop */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CreateEventModal from "./../modals/CreateEventModal";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Create"
       
          component={CreateEventModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
