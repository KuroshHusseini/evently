/* eslint-disable no-undef */
import React, { useState, useContext } from "react";
import { useValidation } from "react-native-form-validator";

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { theme } from "./../theme/index";
import CustomLoader from "../components/CustomLoader";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";

import { AuthenticationContext } from "../context/AuthenticationContext";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { onRegister, isLoading } = useContext(AuthenticationContext);

  const { validate, isFieldInError } = useValidation({
    state: { firstName, lastName, number, email, password, repeatPassword },
  });

  const registerHandler = () => {
    validate({
      firstName: { minlength: 2, maxlength: 10, required: true },
      lastName: { minlength: 2, maxlength: 10, required: true },
      email: { email: true, required: true },
      number: { numbers: true, minlength: 8, required: true },
      password: {
        minlength: 8,
        maxlength: 15,
        required: true,
        hasNumber: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialCharacter: true,
      },
      repeatPassword: { equalPassword: password },
    });

    if (isFieldInError("firstName")) {
      Alert.alert("Authentication Error", "First name is required");
    } else if (isFieldInError("lastName")) {
      Alert.alert("Authentication Error", "Last name is required");
    } else if (isFieldInError("email")) {
      Alert.alert("Authentication Error", "Email address must be valid");
    } else if (isFieldInError("number")) {
      Alert.alert(
        "Authentication Error",
        "Phone number is required and must be a minimum of 8 digits"
      );
    } else if (isFieldInError("password") || isFieldInError("repeatPassword")) {
      Alert.alert(
        "Authentication Error",
        "Passwords must match and contain a minimum length of 8 characters with the following format upper case, lower case, number, special character."
      );
    } else {
      onRegister(firstName, lastName, number, email, password);
    }
  };
  return isLoading ? (
    <View style={styles.loader}>
      <CustomLoader />
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/register_logo.png")}
            />
          </View>
          <ScrollView style={styles.innerContainer}>
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
              <CustomButton title="register" onPressHandler={registerHandler} />
            </View>
          </ScrollView>
        </>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  innerContainer: {
    width: "90%",

    marginBottom: theme.space[2],
  },
  iconContainer: {
    height: 200,
    width: 200,
    marginVertical: theme.space[1],
  },
  icon: {
    height: 200,
    width: 200,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: theme.space[1],
  },
});
export default RegisterScreen;
