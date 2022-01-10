/* eslint-disable react/no-children-prop */
import React, { useContext } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CreateEventModal from "./../modals/CreateEventModal";
import SingleEventModal from "./../modals/SingleEventModal";
import CustomButton from "./../components/CustomButton";

import { theme } from "./../theme/index";
import EditEventModal from "../modals/EditEventModal";
import { UserContext } from "./../context/UserContext";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);
  const onCreateEventHandler = () => navigation.navigate("Create");
  const onCancelHandler = () => navigation.navigate("Home");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.main.secondary,
          },
          headerTintColor: theme.colors.main.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => {
            return (
              userInfo &&
              !userInfo.maintainer && (
                <CustomButton
                  onPressHandler={onCreateEventHandler}
                  title="Create"
                  color="#fff"
                />
              )
            );
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

      <Stack.Group
        screenOptions={{
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
              title="Cancel"
              color="#fff"
            />
          ),
        }}
      >
        <Stack.Screen name="Create" component={CreateEventModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
