import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../theme";

const CustomTextInput = (props) => {
  return (
    <TextInput
      label={props.title}
      dark={true}
      keyboardAppearance="dark"
      underlineColor={theme.colors.main.secondary}
      onChangeText={props.onChange}
      value={props.inputValue}
      {...props}
    />
  );
};

export default CustomTextInput;
