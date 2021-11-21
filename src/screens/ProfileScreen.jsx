import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "../context/UserContext";

import CustomButton from "./../components/CustomButton";

const ProfileScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);
  const { userInfo, onDeleteUser } = useContext(UserContext);
  console.log(
    "🚀 ~ file: ProfileScreen.jsx ~ line 12 ~ ProfileScreen ~ userInfo",
    userInfo
  );

  return (
    <View style={styles.container}>
      <CustomButton
        title="edit your information"
        onPressHandler={() => onLogout()}
      />
      <CustomButton
        title="delete your account"
        onPressHandler={() => {
          onDeleteUser();
          onLogout();
        }}
      />
      <CustomButton title="log out" onPressHandler={() => onLogout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ProfileScreen;
