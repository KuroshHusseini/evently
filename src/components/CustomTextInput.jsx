import React from "react";
import { theme } from "../theme";
import { TextInput, Text, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const CustomTextInput = (props) => {
  return (
    <>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={theme.colors.main.grey}
        style={styles.formFieldText}
        onChange={props.onChangeText}
        value={props.value}
        {...props}
      />
      {props.errorLabel && (
        <View style={styles.errorTextContainer}>
          <MaterialIcons
            name="error"
            size={24}
            color={theme.colors.text.error}
          />
          <Text style={styles.errorLabel}>{props.errorLabel}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 15,
    marginVertical: theme.space[0],
    paddingLeft: theme.space[1],
  },
  formFieldText: {
    backgroundColor: theme.colors.main.lightGray,
    fontSize: 14,
    borderRadius: theme.radius[0],
    padding: theme.space[1],
  },
  errorTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: theme.space[0],
  },
  errorLabel: {
    fontSize: 14,
    color: theme.colors.text.error,
    marginLeft: theme.space[0],
  },
});

export default CustomTextInput;
