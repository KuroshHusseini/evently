import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import { AuthenticationContext } from "../context/AuthenticationContext";

import CustomTextInput from "./../components/CustomTextInput";
import { theme } from "./../theme/index";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const { onLogin, error } = useContext(AuthenticationContext);

  const onEmailChangeHandler = (email) => {
    setEmail(email);
  };

  const onPasswordChangeHandler = (password) => {
    setPassword(password);
  };

  return (
    <View style={styles.container}>
      <CustomText title="Login" />
      <View style={styles.innerContainer}>
        <CustomTextInput
          label="Email"
          value={email}
          placeholder="Enter your email"
          onChangeText={onEmailChangeHandler}
        />
        <CustomTextInput
          label="Password"
          value={password}
          placeholder="Enter your password"
          errorLabel={error && "Wrong password or email"}
          onChangeText={onPasswordChangeHandler}
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
    </View>
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
