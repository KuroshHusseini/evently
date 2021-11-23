import React, { useState, useContext } from "react";
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
      number,
    };
    onUserUpdate(userId, newUserInfo);
    navigation.navigate("Profile");
  };

  return (
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
  );
};

export default EditProfileInfoModal;
