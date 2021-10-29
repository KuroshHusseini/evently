/* eslint-disable react/no-children-prop */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../screens/CartScreen";
import { theme } from "./../theme/index";

const Stack = createStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
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

export default CartNavigator;
