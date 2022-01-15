/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { UserContext } from "./../context/UserContext";
import CustomLoader from "./../components/CustomLoader";
import ProfileEditForm from "../components/ProfileEditForm";
const EditProfileInfoModal = ({ route, navigation }) => {
  const { onUserUpdate, isLoading } = useContext(UserContext);
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
      {isLoading ? (
        <View style={styles.loader}>
          <CustomLoader />
        </View>
      ) : (
        <>
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProfileInfoModal;
