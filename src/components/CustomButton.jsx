import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomButton = ({ title,icon, onPressHandler }) => {
  return (
    <Button
      mode="contained"
      dense={true}
      icon={icon}
      dark={true}
      color="#000"
      contentStyle={styles.buttonStyle}
      onPress={onPressHandler}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
  },
});

export default CustomButton;
