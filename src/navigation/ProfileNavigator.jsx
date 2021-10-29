import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "./../screens/ProfileScreen";
import { theme } from "./../theme/index";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
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
};

export default ProfileNavigator;
