import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "./../theme/index";

import UploadImage from "../components/UploadImage";
import CustomTextInput from "../components/CustomTextInput";
import DateTimePicker from "./../components/DateTimePicker";


//TODO): CONTINUE IMPLEMENTING THE CREATE MODAL AND CLEAN IT AFTER

const CreateEventModal = () => {
  const [image, setImage] = useState(null);
  const [isDateTimePickerVisible, setDateTimePickerVisibility] =
    useState(false);

  console.log(
    "🚀 ~ file: CreateEventModal.jsx ~ line 7 ~ CreateEventModal ~ image",
    image
  );

  //* imagePicker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //* date picker
  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleStartDateTimeConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDateTimePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <UploadImage image={image} addImage={pickImage} />
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Title"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <CustomTextInput
            label="Description"
            keyboardAppearance="dark"
            multiline
            underlineColor={theme.colors.main.secondary}
          />
          <CustomTextInput
            label="Location"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <CustomTextInput
            label="Organization"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <DateTimePicker
            isDateTimePickerVisible={isDateTimePickerVisible}
            showDateTimePicker={showDateTimePicker}
            hideDateTimePicker={hideDateTimePicker}
            handleConfirm={handleStartDateTimeConfirm}
          />
        </View>
        <DateTimePicker
          isDateTimePickerVisible={isDateTimePickerVisible}
          showDateTimePicker={showDateTimePicker}
          hideDateTimePicker={hideDateTimePicker}
          handleConfirm={handleStartDateTimeConfirm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: theme.space[1],
  },
});

export default CreateEventModal;
