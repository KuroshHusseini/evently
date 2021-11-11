/* eslint-disable react/no-children-prop */
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { theme } from "./../theme/index";

import CartScreen from "../screens/CartScreen";
import CustomButton from "./../components/CustomButton";
import SingleEventModal from "./../modals/SingleEventModal";

const Stack = createStackNavigator();

const CartNavigator = ({ navigation }) => {
  const onCancelHandler = () => navigation.navigate("Cart");
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
      <Stack.Screen
        name="Detail"
        component={SingleEventModal}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerStyle: {
            backgroundColor: theme.colors.main.secondary,
          },
          headerTintColor: theme.colors.main.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <CustomButton
              onPressHandler={onCancelHandler}
              title="Back"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
