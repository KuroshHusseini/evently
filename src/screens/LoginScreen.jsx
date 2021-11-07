import React, { useState, useContext } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import CustomButton from "../components/CustomButton";
import CustomTextInput from "./../components/CustomTextInput";
import CustomText from "../components/CustomText";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { theme } from "./../theme/index";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const { onLogin } = useContext(AuthenticationContext);

  return (
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
          <CustomButton
            title="login"
            onPressHandler={() => onLogin(email, password)}
          />
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
