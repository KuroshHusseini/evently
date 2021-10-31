/* eslint-disable react/no-children-prop */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import CreateEventModal from "./../modals/CreateEventModal";
import CustomButton from "./../components/CustomButton";

import { theme } from "./../theme/index";

const Stack = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  
  const onCreateEventHandler = () => navigation.navigate("Create");

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
          headerRight: () => (
            <CustomButton
              onPressHandler={onCreateEventHandler}
              title="Create"
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.main.secondary,
          },
          headerTintColor: theme.colors.main.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Create" component={CreateEventModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
