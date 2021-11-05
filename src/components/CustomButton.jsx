import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <Button
      mode="contained"
      dense={true}
      icon={props.icon}
      dark={true}
      color="#000"
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
