/* eslint-disable no-undef */
import React from "react";
import { theme } from "./../theme/index";

import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";

const ProfileEditForm = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/edit_logo.png")}
            />
          </View>
          <ScrollView InputScrollView style={styles.inputContainer}>
            <CustomTextInput
              label="First name"
              value={props.firstName}
              onChangeText={props.onChangeFirstName}
              keyboardAppearance="dark"
              underlineColor={theme.colors.main.secondary}
            />
            <CustomTextInput
              label="Last name"
              value={props.lastName}
              onChangeText={props.onChangeLastName}
              keyboardAppearance="dark"
              underlineColor={theme.colors.main.secondary}
            />
            <CustomTextInput
              label="Number"
              value={props.phoneNumber}
              onChangeText={props.onChangeNumber}
              keyboardAppearance="dark"
              underlineColor={theme.colors.main.secondary}
            />
            <CustomTextInput
              label="Email"
              editable={false}
              selectTextOnFocus={false}
              value={props.email}
              underlineColor={theme.colors.main.secondary}
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="save"
              mode="contained"
              dark={true}
              color={theme.colors.main.secondary}
              onPressHandler={props.onSaveHandler}
            />
          </View>
        </>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    paddingVertical: theme.space[3],
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 300,
    width: 250,
  },
  inputContainer: {
    width: "90%",
    marginTop: theme.space[0],
  },
  buttonContainer: {
    width: "90%",
    margin: theme.space[2],
  },
});

export default ProfileEditForm;
