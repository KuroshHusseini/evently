/* eslint-disable no-undef */
import React, { useState, useContext } from "react";

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";

import { theme } from "./../theme/index";
import { useValidation } from "react-native-form-validator";
import CustomLoader from "../components/CustomLoader";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "./../components/CustomTextInput";

import { AuthenticationContext } from "../context/AuthenticationContext";

const LoginScreen = ({ navigation }) => {
  const { onLogin, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("admin1@gmail.com");
  const [password, setPassword] = useState("Admin123#");

  const { validate, getErrorMessages } = useValidation({
    state: { email, password },
  });

  const loginHandler = () => {
    validate({
      email: { email: true, required: true },
      password: { password: true, required: true },
    });
    if (getErrorMessages()) {
      Alert.alert("Error", "Wrong email or password!");
    } else {
      onLogin(email, password);
    }
  };

  return isLoading ? (
    <CustomLoader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Image
          style={styles.icon}
          source={require("../../assets/login_logo.png")}
        />
      </View>
      <View style={styles.innerContainer}>
        <CustomTextInput
          testID="emailTextInput"
          label="Email"
          value={email}
          placeholder="Enter your email"
          onChangeText={(e) => setEmail(e)}
        />
        <CustomTextInput
          testID="passwordTextInput"
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
            testID="onSubmitBtn"
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
  icon: {
    height: 250,
    width: 250,
  },
  innerContainer: {
    width: "90%",
  },
  buttonContainer: {
    marginTop: theme.space[1],
  },
});

export default LoginScreen;
