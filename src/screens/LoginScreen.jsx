import React, { useState, useContext } from "react";

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import { theme } from "./../theme/index";
import { useValidation } from "react-native-form-validator";

import CustomButton from "../components/CustomButton";
import CustomTextInput from "./../components/CustomTextInput";
import CustomText from "../components/CustomText";

import { AuthenticationContext } from "../context/AuthenticationContext";

//TODO: Add react native skeleton for loading
const LoginScreen = ({ navigation }) => {
  const { onLogin, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");

  const { validate, getErrorMessages } = useValidation({
    state: { email, password },
  });

  const loginHandler = () => {
    validate({
      email: { email: true, required: true },
      password: { password: true, required: true },
    });
    getErrorMessages() && Alert.alert("Authentication Error", "Wrong email or password!");
    onLogin(email, password);
  };

  return isLoading ? (
    <ActivityIndicator size="large" Colors={theme.colors.main.secondary} />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <CustomText title="Login" />
      <View style={styles.innerContainer}>
        <CustomTextInput
          label="Email"
          value={email}
          placeholder="Enter your email"
          onChangeText={(e) => setEmail(e)}
        />
        <CustomTextInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(p) => setPassword(p)}
        />
        <View style={styles.buttonContainer}>
          <CustomButton title="login" onPressHandler={loginHandler} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="register"
            onPressHandler={() => navigation.navigate("RegisterScreen")}
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

export default LoginScreen;
