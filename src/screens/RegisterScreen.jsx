import React, { useState, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { theme } from "./../theme/index";

import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";

import { AuthenticationContext } from "../context/AuthenticationContext";

const RegisterScreen = () => {
  const [email, setEmail] = useState("admin1@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [repeatPassword, setRepeatPassword] = useState("admin1223");
  const { onRegister, error } = useContext(AuthenticationContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <>
        <CustomText title="Register" />
      </>
      <View style={styles.innerContainer}>
        {/* <CustomTextInput label="First name" />
        <CustomTextInput label="Last name" />
        <CustomTextInput label="Phone number" /> */}
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <CustomTextInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(p) => setPassword(p)}
        />
        <CustomTextInput
          label="Confirm password"
          value={repeatPassword}
          placeholder="Repeat your password"
          errorLabel={error}
          secureTextEntry
          onChangeText={(rp) => setRepeatPassword(rp)}
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="register"
            onPressHandler={() => onRegister(email, password, repeatPassword)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
  },
  buttonContainer: {
    marginTop: theme.space[1],
  },
});
export default RegisterScreen;
