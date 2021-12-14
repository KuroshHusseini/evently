/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { Image, View, StyleSheet } from "react-native";
import ProfileEditForm from "../components/ProfileEditForm";
import { UserContext } from "./../context/UserContext";
const EditProfileInfoModal = ({ route, navigation }) => {
  const { onUserUpdate } = useContext(UserContext);
  const { userInfo, userId } = route.params;
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [number, setNumber] = useState(userInfo.phoneNumber);

  const onSaveHandler = () => {
    const newUserInfo = {
      ...userInfo,
      firstName,
      lastName,
      phoneNumber: number,
    };
    onUserUpdate(userId, newUserInfo);
    navigation.navigate("Profile");
  };

  return (
    <>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require("../../assets/edit_logo.png")}
        />
      </View>
      <ProfileEditForm
        firstName={firstName}
        onChangeFirstName={(f) => setFirstName(f)}
        lastName={lastName}
        onChangeLastName={(l) => setLastName(l)}
        phoneNumber={number}
        onChangeNumber={(n) => setNumber(n)}
        email={userInfo.email}
        onSaveHandler={onSaveHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 250,
    width: 250,
  },
});

export default EditProfileInfoModal;
