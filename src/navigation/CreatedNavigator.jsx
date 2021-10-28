/* eslint-disable react/no-children-prop */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatedScreen from "./../screens/CreatedScreen";

const Stack = createStackNavigator();

const CreatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Created" component={CreatedScreen} />
    </Stack.Navigator>
  );
};

export default CreatedNavigator;
