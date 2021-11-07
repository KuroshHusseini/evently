import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthenticationContext } from "../context/AuthenticationContext";
import CustomButton from "./../components/CustomButton";

const ProfileScreen = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <View style={styles.container}>
      <CustomButton title="Log out" onPressHandler={() => onLogout()} />
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
