import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "./../screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileNavigator = ({ event }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" event={event} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
