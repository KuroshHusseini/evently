import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../theme";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "../context/UserContext";

import CustomButton from "./../components/CustomButton";
import UserProfileCard from "../components/UserProfileCard";
//TODO: fetch users information
const ProfileScreen = () => {
  const { user, onLogout } = useContext(AuthenticationContext);
  const { onDeleteUser } = useContext(UserContext);

  const deleteHandler = () => {
    onDeleteUser(user.uid);
    onLogout();
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <UserProfileCard
          firstName="Kurosh"
          lastName="Husseini"
          email="admin@gmail.com"
          number="045682266676"
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.innerBtnContainer}>
          <CustomButton
            title="edit your information"
            onPressHandler={() => onLogout()}
          />
        </View>
        <View style={styles.innerBtnContainer}>
          <CustomButton
            title="delete your account"
            onPressHandler={deleteHandler}
          />
        </View>
        <View style={styles.innerBtnContainer}>
          <CustomButton title="log out" onPressHandler={() => onLogout()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  cardContainer: {
    margin: theme.space[2],
  },
  innerBtnContainer: {
    marginTop: theme.space[0],
  },
  buttonContainer: {
    marginHorizontal: theme.space[2],
  },
});

export default ProfileScreen;
