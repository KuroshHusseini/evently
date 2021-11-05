import React from "react";
// import { TextInput } from "react-native-paper";
import { theme } from "../theme";
import { View, TextInput, Text, StyleSheet } from "react-native";

const CustomTextInput = (props) => {
  return (

    <View style={styles.formFieldWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.formFieldText}
        onChange={props.onChangeText}
        value={props.value}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formFieldWrapper: {},
  formFieldText: {
    backgroundColor: theme.colors.main.lightGray,
    fontSize: 14,
    borderRadius: theme.radius[0],
    padding: theme.space[1],
  },
  labelText: {
    fontSize: 15,
    marginVertical: theme.space[0],
    paddingLeft: theme.space[1],
  },
});

export default CustomTextInput;
