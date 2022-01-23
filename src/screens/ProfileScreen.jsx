/* eslint-disable no-undef */
import React, { useContext } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { theme } from "../theme";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { UserContext } from "../context/UserContext";

import CustomButton from "./../components/CustomButton";
import UserProfileCard from "../components/UserProfileCard";
import CustomLoader from "./../components/CustomLoader";
const ProfileScreen = ({ navigation }) => {
  const { user, onChangePassword, onLogout } = useContext(
    AuthenticationContext
  );
  const { isLoading, userInfo, onDeleteUser } = useContext(UserContext);

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
          onPress: async (password) => {
            onChangePassword(password);
          },
        },
      ],
      "secure-text",
      null,
      "dark"
    );
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <CustomLoader />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/profile_logo.png")}
            />
          </View>
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
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  iconContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 250,
    width: 250,
  },
  cardContainer: {
    margin: theme.space[2],
  },
  buttonContainer: {
    marginHorizontal: theme.space[2],
  },
  innerBtnContainer: {
    marginTop: theme.space[0],
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
