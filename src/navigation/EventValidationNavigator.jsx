/* eslint-disable react/no-children-prop */
import React from "react";
import { theme } from "./../theme/index";

import { TransitionPresets } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

import CustomButton from "./../components/CustomButton";
import SingleEventModal from "./../modals/SingleEventModal";
import EventValidationScreen from "./../screens/EventValidationScreen";

const Stack = createStackNavigator();

const EventValidationNavigator = ({ navigation }) => {
  const onCancelHandler = () => navigation.navigate("Validate");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Validate"
        component={EventValidationScreen}
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

export default EventValidationNavigator;
