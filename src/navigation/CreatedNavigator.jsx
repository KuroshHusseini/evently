/* eslint-disable react/no-children-prop */
import React from "react";
import { theme } from "./../theme/index";

import { TransitionPresets } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

import CreatedScreen from "./../screens/CreatedScreen";
import CustomButton from "./../components/CustomButton";
import SingleEventModal from "./../modals/SingleEventModal";
import EditEventModal from "./../modals/EditEventModal";

const Stack = createStackNavigator();

const CreatedNavigator = ({ navigation }) => {
  const onCancelHandler = () => navigation.navigate("Created");
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

      <Stack.Screen
        name="Edit"
        component={EditEventModal}
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

export default CreatedNavigator;
