import React, { useState, useContext } from "react";

import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "./../theme/index";

import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";

import { AuthenticationContext } from "../context/AuthenticationContext";


//TODO: Add react native skeleton for loading
const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("Kurosh");
  const [lastName, setLastName] = useState("Husseini");
  const [number, setNumber] = useState("0456925222");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [repeatPassword, setRepeatPassword] = useState("admin123");

  const { onRegister, isLoading } = useContext(AuthenticationContext);

  return isLoading ? (
    <ActivityIndicator size="large" Colors={theme.colors.main.secondary} />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* <CustomText title="Register" /> */}
      <View style={styles.innerContainer}>
        <CustomTextInput
          label="First name"
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={(f) => setFirstName(f)}
        />
        <CustomTextInput
          label="Last name"
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={(l) => setLastName(l)}
        />
        <CustomTextInput
          label="Phone number"
          placeholder="Enter your number"
          value={number}
          keyboardType="numeric"
          onChangeText={(n) => setNumber(n)}
        />
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
          secureTextEntry
          onChangeText={(rp) => setRepeatPassword(rp)}
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="register"
            onPressHandler={() =>
              onRegister(firstName, lastName, number, email, password)
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "90%",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: theme.space[1],
  },
});
export default RegisterScreen;
