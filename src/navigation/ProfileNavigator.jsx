import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { theme } from "./../theme/index";

import ProfileScreen from "./../screens/ProfileScreen";
import EditProfileInfoModal from "./../modals/EditProfileInfoModal";
import CustomButton from "./../components/CustomButton";

const Stack = createStackNavigator();

const ProfileNavigator = ({ navigation }) => {
  const onCancelHandler = () => navigation.navigate("Profile");
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

      <Stack.Screen
        name="EditProfileInfo"
        component={EditProfileInfoModal}
        options={{
          title: "Edit your information",
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

export default ProfileNavigator;
