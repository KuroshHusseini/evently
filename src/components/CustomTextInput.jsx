import React from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../theme";

const CustomTextInput = (props) => {
  return (
    <TextInput
      label={props.title}
      dark={true}
      mode="outlined"
      theme={{
        colors: {
          primary: theme.colors.main.grey,
          underlineColor: "transparent",
        },
      }}
      keyboardAppearance="dark"
      onChangeText={props.onChange}
      value={props.inputValue}
      {...props}
    />
  );
};

export default CustomTextInput;
