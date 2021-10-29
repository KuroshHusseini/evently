import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { theme } from "./../theme/index";
import { TextInput } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";
import UploadImage from "../components/UploadImage";

const CreateEventModal = () => {
  const [image, setImage] = useState(null);
  console.log(
    "🚀 ~ file: CreateEventModal.jsx ~ line 7 ~ CreateEventModal ~ image",
    image
  );

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <UploadImage image={image} addImage={pickImage} />
        <View style={styles.inputContainer}>
          <TextInput
            label="Title"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <TextInput
            label="Description"
            multiline
            keyboardAppearance="dark"
            numberOfLines={3}
            maxHeight={200}
            underlineColor={theme.colors.main.secondary}
          />
          <TextInput
            label="Location"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <TextInput
            label="Organization"
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
        </View>
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
