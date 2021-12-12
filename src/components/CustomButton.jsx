import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "./../theme/index";

const CustomButton = (props) => {
  return (
    <Button
      testID="customButton"
      mode="contained"
      dense={true}
      icon={props.icon}
      dark={true}
      color={theme.colors.main.secondary}
      contentStyle={styles.buttonStyle}
      onPress={props.onPressHandler}
    >
      {props.title}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
  },
});

export default CustomButton;
