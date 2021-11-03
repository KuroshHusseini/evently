import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { events } from "./../../DummyData";

//TODO): CONTINUE IMPLEMENTING THE CREATE MODAL AND CLEAN IT AFTER

const CreateEventModal = ({ navigation }) => {
  const [image, setImage] = useState(null);
  //* string data
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");

  //* event type
  const values = ["Campus", "Party", "Other"];
  const [eventType, setEventType] = useState(values[1]);
  console.log(
    "🚀 ~ file: CreateEventModal.jsx ~ line 34 ~ CreateEventModal ~ eventType",
    eventType
  );

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

  //* title, Details, location, organization, amount
  const onTitleChangeHandler = (value) => setTitle(value);
  const onDetailsChangeHandler = (value) => setDetails(value);
  const onHostChangeHandler = (value) => setHost(value);
  const onLocationChangeHandler = (value) => setLocation(value);
  const onAmountChangeHandler = (value) => setAmount(value);

  //* type of event handler
  const onSegmentChangeHandler = (event) =>
    setEventType(event.nativeEvent.value);

  //* start date
  const showStartDateTimePicker = () => setStartPickerVisible(true);
  const hideStartDateTimePicker = () => setStartPickerVisible(false);
  const handleStartDateTimeConfirm = (startDate) => {
    setStartDateTime(moment(startDate).format("LL HH:mm").toString());
    hideStartDateTimePicker();
  };

  //* end date
  const showEndDateTimePicker = () => setEndPickerVisible(true);
  const hideEndDateTimePicker = () => setEndPickerVisible(false);
  const handleEndDateTimeConfirm = (endDate) => {
    setEndDateTime(moment(endDate).format("LL HH:mm").toString());
    hideEndDateTimePicker();
  };

  //* save
  const onSaveHandler = () => {
    const data = {
      id: uuidv4(),
      image,
      title,
      details,
      location,
      eventType: eventType,
      amount,
      startTimeDate: startDateTime,
      endTimeDate: endDateTime,
      attending: [],
      userID: uuidv4(),
    };
    events.unshift(data);
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
            inputValue={title}
            onChange={onTitleChangeHandler}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <CustomTextInput
            label="Host"
            inputValue={host}
            onChange={onHostChangeHandler}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CustomTextInput
            label="Details"
            inputValue={details}
            onChange={onDetailsChangeHandler}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <CustomTextInput
            label="Location"
            inputValue={location}
            onChange={onLocationChangeHandler}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />

          <SegmentedControl
            style={styles.segmentStyle}
            appearance="light"
            values={values}
            selectedIndex={eventType}
            onChange={onSegmentChangeHandler}
          />

          <CustomTextInput
            label="Cost"
            inputValue={amount}
            onChange={onAmountChangeHandler}
            keyboardAppearance="dark"
            underlineColor={theme.colors.main.secondary}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.dateTimeButtons}>
              <DateTimePicker
                title="start date and time"
                value={startDateTime}
                isDateTimePickerVisible={isStartPickerVisible}
                showDateTimePicker={showStartDateTimePicker}
                hideDateTimePicker={hideStartDateTimePicker}
                handleConfirm={handleStartDateTimeConfirm}
              />
            </View>
            <View style={styles.dateTimeButtons}>
              <DateTimePicker
                title="end date and time"
                value={endDateTime}
                isDateTimePickerVisible={isEndPickerVisible}
                showDateTimePicker={showEndDateTimePicker}
                hideDateTimePicker={hideEndDateTimePicker}
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
    backgroundColor: theme.colors.main.lightGray,
  },
  inputContainer: {
    width: "90%",
    marginTop: theme.space[1],
  },
  segmentStyle: {
    height: 45,
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
