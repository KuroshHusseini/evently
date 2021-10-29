/* eslint-disable react/no-children-prop */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatedScreen from "./../screens/CreatedScreen";
import { theme } from "./../theme/index";

const Stack = createStackNavigator();

const CreatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Created"
        component={CreatedScreen}
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

export default CreatedNavigator;
