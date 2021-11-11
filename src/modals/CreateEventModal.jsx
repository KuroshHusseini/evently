import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import { theme } from "./../theme/index";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import UploadImage from "../components/UploadImage";
import CustomTextInput from "../components/CustomTextInput";
import DateTimePicker from "./../components/DateTimePicker";
import CustomButton from "../components/CustomButton";

import { createEvent } from "../services/eventServices";

const CreateEventModal = ({ navigation }) => {
  const [image, setImage] = useState(null);
  //* string data
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  //* event type
  const values = ["Campus", "Party", "Other"];
  const [type, setType] = useState(values[0]);
  //* start time picker
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  //* end time picker
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [endDateTime, setEndDateTime] = useState(null);

  //* image picker
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    !result.cancelled && setImage(result.uri);
  };

  //* type of event handler
  const onSegmentChangeHandler = (event) => setType(event.nativeEvent.value);

  //* start date
  const handleStartDateTimeConfirm = (startDate) => {
    setStartDateTime(moment(startDate).format("LL HH:mm").toString());
    setStartPickerVisible(false);
  };

  //* end date
  const handleEndDateTimeConfirm = (endDate) => {
    setEndDateTime(moment(endDate).format("LL HH:mm").toString());
    setEndPickerVisible(false);
  };

  //* save
  const onSaveHandler = () => {
    createEvent(
      image,
      title,
      host,
      details,
      location,
      type,
      cost,
      startDateTime,
      endDateTime
    );
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <UploadImage image={image} addImage={pickImage} />
        <View InputScrollView style={styles.inputContainer}>
          <CustomTextInput
            label="Title"
            value={title}
            onChangeText={(t) => setTitle(t)}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <CustomTextInput
            label="Host"
            value={host}
            onChangeText={(h) => setHost(h)}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CustomTextInput
            label="Details"
            value={details}
            onChangeText={(d) => setDetails(d)}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CustomTextInput
            label="Location"
            value={location}
            onChangeText={(l) => setLocation(l)}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CustomTextInput
            label="Cost"
            value={cost}
            onChangeText={(c) => setCost(c)}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <SegmentedControl
            style={styles.segmentStyle}
            appearance="light"
            values={values}
            selectedIndex={type}
            onChange={onSegmentChangeHandler}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.dateTimeButtons}>
              <DateTimePicker
                title="start date and time"
                value={startDateTime}
                isDateTimePickerVisible={isStartPickerVisible}
                showDateTimePicker={() => setStartPickerVisible(true)}
                hideDateTimePicker={() => setStartPickerVisible(false)}
                handleConfirm={handleStartDateTimeConfirm}
              />
            </View>
            <View style={styles.dateTimeButtons}>
              <DateTimePicker
                title="end date and time"
                value={endDateTime}
                isDateTimePickerVisible={isEndPickerVisible}
                showDateTimePicker={() => setEndPickerVisible(true)}
                hideDateTimePicker={() => setEndPickerVisible(false)}
                handleConfirm={handleEndDateTimeConfirm}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <CustomButton
            title="Save"
            mode="contained"
            dark={true}
            color={theme.colors.main.secondary}
            onPressHandler={onSaveHandler}
          />
        </View>
      </KeyboardAvoidingView>
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
    marginTop: theme.space[0],
  },
  segmentStyle: {
    height: 40,
    marginTop: theme.space[0],
  },
  buttonContainer: {
    justifyContent: "center",
  },
  dateTimeButtons: {
    marginTop: theme.space[0],
  },
});

export default CreateEventModal;
