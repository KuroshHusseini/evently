import React, { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "../context/UserContext";

import CustomButton from "./../components/CustomButton";
import UserProfileCard from "../components/UserProfileCard";
const ProfileScreen = ({ navigation }) => {
  const { user, onLogout, onChangePassword } = useContext(
    AuthenticationContext
  );
  const { getUser, userInfo, onDeleteUser } = useContext(UserContext);

  getUser(user.uid);

  const onEditProfileInfo = () =>
    navigation.navigate("EditProfileInfo", { userInfo, userId: user.uid });

  const deleteHandler = () =>
    Alert.alert(
      "Delete Account!",
      "Are you sure you want to delete your account.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            onDeleteUser(user.uid);
            onLogout();
          },
        },
      ]
    );

  const onHandleNewPassword = () => {
    Alert.prompt(
      "Current password",
      "To change your password please enter your current password.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Enter",
          onPress: (password) => {
            onChangePassword(password);
            onLogout();
          },
        },
      ],
      "secure-text",
      null,
      "dark"
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <UserProfileCard
          firstName={userInfo?.firstName}
          lastName={userInfo?.lastName}
          email={userInfo?.email}
          number={userInfo?.phoneNumber}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.innerBtnContainer}>
          <CustomButton
            title="edit your information"
            onPressHandler={onEditProfileInfo}
          />
        </View>
        <View style={styles.innerBtnContainer}>
          <CustomButton
            title="change your password"
            onPressHandler={onHandleNewPassword}
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
