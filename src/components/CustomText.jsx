import React from "react";
import { Text, StyleSheet } from "react-native";
const CustomText = ({ title }) => {
  return <Text style={styles.textStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 80,
  }
})

export default CustomText;
